export interface IngestedEvent {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  subject_id: string;
  type: string;
  status: number;
  durationMs: number;
  requestBody: any;
  responseBody: any;
}

const STORAGE_KEY_EVENTS = "pamha_sandbox_events";
const STORAGE_KEY_APIKEYS = "pamha_api_keys";

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  token: string;
  tier: "sandbox" | "production";
  createdAt: string;
  lastUsedAt?: string;
  requestsCount: number;
}

export function getStoredApiKeys(): ApiKeyItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APIKEYS);
    if (raw) return JSON.parse(raw);
  } catch {}
  const defaults: ApiKeyItem[] = [
    {
      id: "key_default_sb",
      name: "Default Sandbox Key",
      prefix: "pamha_sb_live_",
      token: "pamha_sb_live_49f82bc190a6e7d8c41",
      tier: "sandbox",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      lastUsedAt: new Date().toISOString(),
      requestsCount: 42,
    },
  ];
  try {
    localStorage.setItem(STORAGE_KEY_APIKEYS, JSON.stringify(defaults));
  } catch {}
  return defaults;
}

export function saveApiKey(key: ApiKeyItem): void {
  const current = getStoredApiKeys();
  const updated = [key, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_APIKEYS, JSON.stringify(updated));
  } catch {}
}

export function revokeApiKey(id: string): void {
  const current = getStoredApiKeys();
  const updated = current.filter((k) => k.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_APIKEYS, JSON.stringify(updated));
  } catch {}
}

export function getStoredEvents(): IngestedEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveEventToHistory(event: IngestedEvent): void {
  const current = getStoredEvents();
  const updated = [event, ...current].slice(0, 50); // keep last 50
  try {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(updated));
  } catch {}
}

export function clearEventHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_EVENTS);
  } catch {}
}

export interface ExecutionResult {
  status: number;
  statusText: string;
  latencyMs: number;
  headers: Record<string, string>;
  data: any;
  rawText: string;
}

export async function executeSandboxRequest(
  endpoint: string,
  method: string,
  payloadStr: string,
  apiKey: string = "pamha_sb_live_49f82bc190a6e7d8c41"
): Promise<ExecutionResult> {
  const startTime = performance.now();
  // Simulate network latency (20ms to 75ms)
  await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 55) + 20));
  const latencyMs = Math.round(performance.now() - startTime);

  let body: any = {};
  if (method === "POST" || method === "PUT") {
    try {
      body = JSON.parse(payloadStr);
    } catch {
      const duration = latencyMs;
      return {
        status: 400,
        statusText: "Bad Request",
        latencyMs: duration,
        headers: {
          "content-type": "application/json",
          "x-pamha-request-id": "req_" + Math.random().toString(36).substring(2, 10),
        },
        data: { error: "Invalid JSON payload in request body" },
        rawText: JSON.stringify({ error: "Invalid JSON payload in request body" }, null, 2),
      };
    }
  }

  // Check auth
  if (!apiKey || (!apiKey.startsWith("pamha_sb_") && !apiKey.startsWith("pamha_live_"))) {
    return {
      status: 401,
      statusText: "Unauthorized",
      latencyMs,
      headers: { "content-type": "application/json" },
      data: { error: "Missing or invalid Authorization header. Provide a valid 'Bearer pamha_sb_...' key." },
      rawText: JSON.stringify(
        { error: "Missing or invalid Authorization header. Provide a valid 'Bearer pamha_sb_...' key." },
        null,
        2
      ),
    };
  }

  // Handle /v1/events
  if (endpoint.includes("/events")) {
    const subjectId = body?.subject_id;
    const type = body?.type;

    if (!subjectId) {
      return makeResponse(
        400,
        "Bad Request",
        { error: "Missing required property 'subject_id'" },
        latencyMs
      );
    }

    // PII check
    if (
      typeof subjectId === "string" &&
      (subjectId.includes("@") ||
        subjectId.toLowerCase().includes("john") ||
        subjectId.toLowerCase().includes("smith") ||
        /^\+?[0-9]{10,14}$/.test(subjectId))
    ) {
      return makeResponse(
        422,
        "Unprocessable Entity",
        {
          error: "Strict Zero-PII violation: subject_id must be a pseudonymous hash matching ^sub_[A-Za-z0-9]{8,64}$. Personal names, emails, or phone numbers are rejected at the data-plane edge.",
          safety_code: "PAMHA_PII_GUARDRAIL_BLOCKED",
        },
        latencyMs
      );
    }

    // Subject ID pattern validation
    const subjectPattern = /^sub_[A-Za-z0-9]{8,64}$/;
    if (!subjectPattern.test(subjectId)) {
      return makeResponse(
        422,
        "Unprocessable Entity",
        {
          error: `Invalid subject_id format. Expected pattern: '^sub_[A-Za-z0-9]{8,64}$' (e.g., sub_7f3a9c21b8). Received: '${subjectId}'`,
        },
        latencyMs
      );
    }

    if (!type) {
      return makeResponse(
        400,
        "Bad Request",
        { error: "Missing required property 'type' (e.g., 'checkin.completed', 'biometrics.sleep_recorded')" },
        latencyMs
      );
    }

    // Check for crisis signals in text payload
    const payloadNotes = JSON.stringify(body.payload || "").toLowerCase();
    const isCrisis =
      payloadNotes.includes("suicide") ||
      payloadNotes.includes("kill myself") ||
      payloadNotes.includes("end my life") ||
      payloadNotes.includes("self-harm") ||
      type.includes("crisis");

    let wellbeingScore = 0.62;
    let reasons = ["sleep_regularity_improved", "circadian_rhythm_stable"];
    let recommendations = ["rec_breathing_01", "rec_cbt_reframe_04"];
    let safetyFlags: string[] = [];

    if (isCrisis) {
      wellbeingScore = 0.12;
      reasons = ["acute_distress_detected", "high_urgency_sentiment"];
      recommendations = ["rec_crisis_lifeline_988", "rec_human_clinician_handoff"];
      safetyFlags = ["CRISIS_ESCALATION_TRIGGERED", "URGENT_HUMAN_HANDOFF_REQUIRED"];
    } else if (type.includes("sleep")) {
      wellbeingScore = 0.78;
      reasons = ["deep_sleep_efficiency_elevated", "low_sleep_latency"];
      recommendations = ["rec_morning_sunlight_protocol", "rec_habit_retention"];
    } else if (type.includes("distress") || body?.payload?.stress_level > 4) {
      wellbeingScore = 0.38;
      reasons = ["elevated_autonomic_arousal", "negative_sentiment_delta"];
      recommendations = ["rec_physiological_sigh_02", "rec_box_breathing_4x4"];
      safetyFlags = ["ELEVATED_STRESS_THRESHOLD"];
    }

    const resData = {
      wellbeing_score: wellbeingScore,
      confidence: Math.round((0.75 + Math.random() * 0.18) * 100) / 100,
      reasons,
      recommendation_ids: recommendations,
      safety_flags: safetyFlags,
      event_id: "evt_" + Math.random().toString(36).substring(2, 12),
      processed_at: new Date().toISOString(),
    };

    const result = makeResponse(202, "Accepted", resData, latencyMs);
    saveEventToHistory({
      id: resData.event_id,
      timestamp: new Date().toISOString(),
      method: "POST",
      endpoint: "/v1/events",
      subject_id: subjectId,
      type,
      status: 202,
      durationMs: latencyMs,
      requestBody: body,
      responseBody: resData,
    });
    return result;
  }

  // Handle /v1/recommendations
  if (endpoint.includes("/recommendations")) {
    const resData = {
      subject_id: "sub_7f3a9c21b8",
      model_version: "pamha_adaptive_v1.2",
      recommendations: [
        {
          id: "rec_breathing_01",
          category: "physiological_sigh",
          title: "2-Minute Cyclic Sighing",
          description: "Two quick nasal inhales followed by a prolonged oral sigh exhale to reset autonomic arousal.",
          duration_seconds: 120,
          evidence_tier: "randomized_control_trial",
          priority_score: 0.94,
        },
        {
          id: "rec_cbt_reframe_04",
          category: "cognitive_reframing",
          title: "Thought De-Catastrophizing",
          description: "Guided 3-step reframing technique separating automatic thoughts from empirical reality.",
          duration_seconds: 180,
          evidence_tier: "clinical_consensus",
          priority_score: 0.81,
        },
        {
          id: "rec_grounding_54321",
          category: "somatic_grounding",
          title: "5-4-3-2-1 Sensory Reset",
          description: "Engage visual, auditory, and tactile anchors to alleviate cognitive overload.",
          duration_seconds: 150,
          evidence_tier: "clinical_consensus",
          priority_score: 0.73,
        },
      ],
      generated_at: new Date().toISOString(),
    };
    return makeResponse(200, "OK", resData, latencyMs);
  }

  // Handle /v1/safety-eval
  if (endpoint.includes("/safety-eval")) {
    const text = (body?.signal_text || "").toLowerCase();
    const hasDistress =
      text.includes("kill") ||
      text.includes("suicide") ||
      text.includes("hurt myself") ||
      text.includes("give up") ||
      text.includes("no reason to live");

    const resData = {
      is_safe: !hasDistress,
      risk_level: hasDistress ? "critical" : text.includes("stressed") || text.includes("anxious") ? "moderate" : "low",
      safety_flags: hasDistress ? ["CRISIS_SELF_HARM_DETECTED", "REQUIRES_CLINICAL_HANDOFF"] : [],
      escalation_required: hasDistress,
      confidence: 0.96,
      recommended_action: hasDistress
        ? "trigger_988_crisis_protocol"
        : "deliver_grounding_micro_intervention",
      evaluated_at: new Date().toISOString(),
    };
    return makeResponse(200, "OK", resData, latencyMs);
  }

  // Handle /v1/health
  if (endpoint.includes("/health")) {
    const resData = {
      status: "healthy",
      service: "pamha-data-plane",
      cluster_region: "europe-west1",
      latency_p99_ms: 19.2,
      active_nodes: 12,
      uptime_percentage: "99.998%",
      version: "0.1.0",
      timestamp: new Date().toISOString(),
    };
    return makeResponse(200, "OK", resData, latencyMs);
  }

  return makeResponse(404, "Not Found", { error: `Endpoint ${endpoint} not recognized.` }, latencyMs);
}

function makeResponse(
  status: number,
  statusText: string,
  data: any,
  latencyMs: number
): ExecutionResult {
  return {
    status,
    statusText,
    latencyMs,
    headers: {
      "content-type": "application/json",
      "x-pamha-cluster": "eu-west1-prod-edge",
      "x-pamha-request-id": "req_" + Math.random().toString(36).substring(2, 12),
      "x-ratelimit-remaining": "998",
    },
    data,
    rawText: JSON.stringify(data, null, 2),
  };
}
