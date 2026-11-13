export interface ApiEndpoint {
  id: string;
  method: "POST" | "GET" | "DELETE" | "PUT";
  path: string;
  summary: string;
  description: string;
  category: "Events" | "Insights" | "Recommendations" | "Safety" | "System";
  requestSchema?: any;
  responseSchema?: any;
  sampleRequest: any;
  sampleResponse: any;
}

export const OPENAPI_SPEC = {
  openapi: "3.1.0",
  info: {
    title: "PAMHA Data-Plane API",
    version: "0.1.0",
    description: "Adaptive mental health intelligence data plane API. High-throughput event ingestion, privacy-preserving state inference, personalized recommendations, and clinical safety guardrails.",
  },
  servers: [
    {
      url: "https://sandbox.api.pamha.example/v1",
      description: "Sandbox Environment (Synthetic & isolated developer tier)",
    },
    {
      url: "https://api.pamha.example/v1",
      description: "Production VPC Data-Plane",
    },
  ],
  securitySchemes: {
    ApiKey: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "API Key (pamha_sb_...)",
    },
  },
};

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "submit-event",
    method: "POST",
    path: "/v1/events",
    category: "Events",
    summary: "Submit a subject event",
    description:
      "Ingests a pseudonymous telemetry event (check-in, wearable sleep biometric, interaction timestamp, app usage, or mood rating). Strictly validates subject_id format without personal identifiers.",
    sampleRequest: {
      subject_id: "sub_7f3a9c21b8",
      type: "checkin.completed",
      occurred_at: new Date().toISOString(),
      payload: {
        energy_rating: 4,
        stress_level: 2,
        mood_label: "calm",
        notes_sentiment: 0.74,
      },
    },
    sampleResponse: {
      wellbeing_score: 0.62,
      confidence: 0.81,
      reasons: ["sleep_regularity_improved", "stress_reduction_trend"],
      recommendation_ids: ["rec_breathing_01", "rec_evening_walk"],
      safety_flags: [],
      event_id: "evt_9981a4b6c3",
      processed_at: new Date().toISOString(),
    },
  },
  {
    id: "get-recommendations",
    method: "GET",
    path: "/v1/recommendations",
    category: "Recommendations",
    summary: "Get adaptive micro-interventions",
    description:
      "Fetches context-aware, clinically safe micro-interventions personalized to the subject's current psychological trajectory.",
    sampleRequest: {
      subject_id: "sub_7f3a9c21b8",
      max_results: 3,
      context: "evening_wind_down",
    },
    sampleResponse: {
      subject_id: "sub_7f3a9c21b8",
      recommendations: [
        {
          id: "rec_breathing_01",
          category: "physiological_sigh",
          title: "2-Minute Cyclic Sighing",
          description: "Two quick inhales followed by an extended sigh exhale to reset autonomic arousal.",
          duration_seconds: 120,
          evidence_tier: "randomized_control_trial",
          priority_score: 0.94,
        },
        {
          id: "rec_cbt_reframe_04",
          category: "cognitive_reframing",
          title: "Thought De-Catastrophizing",
          description: "Interactive reflection on worst-case vs most likely scenarios.",
          duration_seconds: 180,
          evidence_tier: "clinical_consensus",
          priority_score: 0.78,
        },
      ],
    },
  },
  {
    id: "evaluate-safety",
    method: "POST",
    path: "/v1/safety-eval",
    category: "Safety",
    summary: "Instant clinical safety triage & risk evaluation",
    description:
      "Performs real-time, deterministic and heuristic safety scanning across unstructured text or rapid state drops. Triggers automated clinical guardrails when self-harm or acute crisis signals are flagged.",
    sampleRequest: {
      subject_id: "sub_7f3a9c21b8",
      signal_text: "I am feeling overwhelmed with deadlines and cannot focus today.",
      sensitivity_tier: "standard",
    },
    sampleResponse: {
      is_safe: true,
      risk_level: "low",
      safety_flags: [],
      escalation_required: false,
      recommended_action: "deliver_grounding_micro_intervention",
      evaluated_at: new Date().toISOString(),
    },
  },
  {
    id: "health-check",
    method: "GET",
    path: "/v1/health",
    category: "System",
    summary: "Data-plane cluster health and latency status",
    description: "Returns health status of the regional ingestion pipelines and inference engines.",
    sampleRequest: {},
    sampleResponse: {
      status: "healthy",
      region: "eu-west-1",
      latency_p99_ms: 18.4,
      data_plane_version: "0.1.0-rc3",
      uptime: "99.994%",
    },
  },
];
