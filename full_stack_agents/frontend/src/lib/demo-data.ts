import type { BeginnerExample, BeginnerResponse, LogFile, PipelineStep, AdvancedResult } from '@/types'

export const DEMO_EXAMPLES: BeginnerExample[] = [
  { id: '1', text: 'Public libraries are important resources for everyone in the city.', label: 'no_hate_speech' },
  { id: '2', text: 'That country is less intelligent and incapable of contributing to society.', label: 'hate_speech' },
  { id: '3', text: 'People from that race are all untrustworthy and should not be allowed to work in public jobs.', label: 'hate_speech' },
]

const REASONING: Record<string, string> = {
  hate_speech: 'The text contains language that targets a group based on protected attributes such as race, ethnicity, or nationality. It uses dehumanizing generalizations and promotes discrimination, which constitutes hate speech.',
  no_hate_speech: 'The text discusses a neutral topic without targeting any group or individual based on protected attributes. There are no threats, insults, or discriminatory language present.',
}

const AGENT_INFO = {
  role: 'Hate Speech Detector',
  goal: 'Analyse the text and identify if any hate speech / offensive language is present',
  backstory: 'You are a Hate Speech Detector for Twitter who understands details very well and expert negotiator. You can identify hate speech / offensive language in given tweet.',
}

export function getDemoVerdict(text: string): BeginnerResponse {
  const lower = text.toLowerCase()
  const isHate = ['unintelligent', 'incapable', 'untrustworthy', 'not be allowed', 'less intelligent', 'should not'].some(kw => lower.includes(kw))
  const verdict = isHate ? 'hate_speech' as const : 'no_hate_speech' as const
  return {
    verdict,
    reasoning: REASONING[verdict],
    confidence: isHate ? 0.97 : 0.92,
    agent_info: AGENT_INFO,
  }
}

export const DEMO_LOGS: LogFile[] = [
  {
    name: 'kubernetes_deployment_error.log',
    content: `2024-10-10T14:32:15.123Z [INFO] Starting deployment of myapp:v1.2.3
2024-10-10T14:32:15.456Z [INFO] Applying deployment configuration...
2024-10-10T14:32:15.789Z [INFO] Creating deployment myapp-deployment in namespace production
2024-10-10T14:32:16.012Z [INFO] Deployment created successfully
2024-10-10T14:32:16.234Z [INFO] Waiting for pods to be ready...
2024-10-10T14:32:16.567Z [WARNING] Pod myapp-deployment-7b8c9d5f4-abc12 is in Pending state
2024-10-10T14:32:17.890Z [ERROR] Pod myapp-deployment-7b8c9d5f4-abc12 failed to start
2024-10-10T14:32:18.123Z [ERROR] Event: Failed to pull image "myapp:v1.2.3": rpc error: code = Unknown desc = Error response from daemon: pull access denied for myapp, repository does not exist or may require 'docker login'
2024-10-10T14:32:18.456Z [ERROR] Pod myapp-deployment-7b8c9d5f4-abc12 status: ImagePullBackOff
2024-10-10T14:32:19.789Z [WARNING] Back-off pulling image "myapp:v1.2.3"
2024-10-10T14:32:20.012Z [ERROR] kubelet: Failed to pull image "myapp:v1.2.3": rpc error: code = Unknown desc = Error response from daemon: pull access denied for myapp
2024-10-10T14:32:21.345Z [ERROR] kubelet: Error syncing pod: ErrImagePull
2024-10-10T14:32:22.678Z [WARNING] Pod myapp-deployment-7b8c9d5f4-abc12 has been in ImagePullBackOff state for 5 seconds
2024-10-10T14:32:25.901Z [ERROR] Deployment rollout failed: deployment "myapp-deployment" exceeded its progress deadline
2024-10-10T14:32:26.234Z [ERROR] ReplicaSet myapp-deployment-7b8c9d5f4 has 0 ready replicas out of 3 desired
2024-10-10T14:32:26.567Z [INFO] Current deployment status: 0/3 pods ready
2024-10-10T14:32:27.890Z [WARNING] Deployment health check failed: no healthy pods found
2024-10-10T14:32:28.123Z [ERROR] Service myapp-service has no available endpoints
2024-10-10T14:32:29.456Z [CRITICAL] Production deployment failed - rollback initiated
2024-10-10T14:32:30.789Z [INFO] Rolling back to previous version myapp:v1.2.2
2024-10-10T14:32:31.012Z [INFO] Rollback completed successfully`,
  },
  {
    name: 'database_connection_error.log',
    content: `2024-10-10T09:15:23.456Z [INFO] Application startup initiated
2024-10-10T09:15:23.789Z [INFO] Loading configuration from /app/config/production.yaml
2024-10-10T09:15:24.012Z [INFO] Initializing database connection pool
2024-10-10T09:15:24.345Z [INFO] Database host: postgres-prod.cluster-xyz.us-west-2.rds.amazonaws.com:5432
2024-10-10T09:15:24.678Z [INFO] Database name: ecommerce_prod
2024-10-10T09:15:24.901Z [INFO] Connection pool size: 20
2024-10-10T09:15:25.234Z [WARNING] Attempting to connect to database...
2024-10-10T09:15:30.567Z [ERROR] Database connection failed: FATAL: password authentication failed for user "app_user"
2024-10-10T09:15:30.890Z [ERROR] Connection attempt 1/5 failed, retrying in 5 seconds...
2024-10-10T09:15:35.123Z [ERROR] Database connection failed: FATAL: password authentication failed for user "app_user"
2024-10-10T09:15:35.456Z [ERROR] Connection attempt 2/5 failed, retrying in 10 seconds...
2024-10-10T09:15:45.789Z [ERROR] Database connection failed: FATAL: password authentication failed for user "app_user"
2024-10-10T09:15:45.012Z [ERROR] Connection attempt 3/5 failed, retrying in 15 seconds...
2024-10-10T09:16:00.345Z [ERROR] Database connection failed: FATAL: password authentication failed for user "app_user"
2024-10-10T09:16:00.678Z [ERROR] Connection attempt 4/5 failed, retrying in 20 seconds...
2024-10-10T09:16:20.901Z [ERROR] Database connection failed: FATAL: password authentication failed for user "app_user"
2024-10-10T09:16:21.234Z [CRITICAL] All database connection attempts failed (5/5)
2024-10-10T09:16:21.567Z [ERROR] Unable to initialize application: database connection pool creation failed
2024-10-10T09:16:21.890Z [ERROR] Health check endpoint returning 503 Service Unavailable
2024-10-10T09:16:22.123Z [WARNING] Load balancer detecting unhealthy instances
2024-10-10T09:16:22.456Z [ERROR] Application startup failed - exiting with code 1
2024-10-10T09:16:22.789Z [INFO] Cleanup initiated
2024-10-10T09:16:23.012Z [INFO] Closing existing connections...
2024-10-10T09:16:23.345Z [INFO] Application shutdown complete`,
  },
]

const REPORT_LOG_ANALYSIS = `## Log Analysis Report

### Primary Issue
Failure to pull Docker image \`myapp:v1.2.3\` from the repository, causing deployment failure and rollback.

### Key Error Messages
1. \`Failed to pull image "myapp:v1.2.3"\` — pull access denied, repository does not exist or may require \`docker login\`
2. \`Pod status: ImagePullBackOff\`
3. \`Deployment rollout failed\` — exceeded progress deadline
4. \`Service myapp-service has no available endpoints\`
5. \`Production deployment failed\` — rollback initiated

### Timeline
| Time | Event |
|------|-------|
| 14:32:15 | Deployment started |
| 14:32:16 | Pod created (Pending) |
| 14:32:17 | Pod failed to start — image pull error |
| 14:32:18–22 | Repeated ImagePullBackOff |
| 14:32:25 | Rollout failed |
| 14:32:29 | Rollback initiated |
| 14:32:31 | Rollback completed |

### Root Cause
Unauthorized access or incorrect Docker repository configuration. The image registry may not exist or authentication (\`docker login\`) is required.`

const REPORT_INVESTIGATION = `## Investigation Report

### Similar Issues Found
- **Kubernetes ImagePullBackOff** is one of the most common deployment failures
- Typically caused by missing image, wrong tag, or authentication issues
- Documented extensively in Kubernetes official troubleshooting guide

### Common Causes (ranked by likelihood)
1. **Missing Docker registry credentials** — no imagePullSecret configured
2. **Image does not exist** — wrong tag or repository name
3. **Registry authentication expired** — credentials rotated but not updated in cluster
4. **Network issues** — cluster cannot reach the registry
5. **Rate limiting** — Docker Hub pull rate limits exceeded

### Official Documentation
- [Kubernetes: Debug Pods](https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/)
- [Docker: Configure authentication](https://docs.docker.com/engine/reference/commandline/login/)
- [Kubernetes: Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)`

const REPORT_SOLUTION = `## Remediation Plan

### Step 1: Verify Docker Image Exists
\`\`\`bash
docker search myapp
docker manifest inspect myapp:v1.2.3
\`\`\`

### Step 2: Authenticate to Registry
\`\`\`bash
docker login
\`\`\`

### Step 3: Create Kubernetes Secret
\`\`\`bash
kubectl create secret generic regcred \\
  --from-file=.dockerconfigjson=$HOME/.docker/config.json \\
  --type=kubernetes.io/dockerconfigjson
\`\`\`

### Step 4: Update Deployment YAML
\`\`\`yaml
spec:
  imagePullSecrets:
    - name: regcred
  containers:
    - name: myapp
      image: myapp:v1.2.3
\`\`\`

### Step 5: Retry Deployment
\`\`\`bash
kubectl apply -f myapp-deployment.yaml
kubectl rollout status deployment/myapp-deployment
\`\`\`

### Verification
\`\`\`bash
kubectl get pods
kubectl describe pod <pod-name>
\`\`\`

### Prevention
- Store registry credentials as Kubernetes secrets
- Use CI/CD pipeline with pre-deployment image pull tests
- Set up Prometheus alerts for pod status changes`

export const DEMO_REPORTS: Record<string, string> = {
  log_analysis: REPORT_LOG_ANALYSIS,
  investigation_report: REPORT_INVESTIGATION,
  solution_plan: REPORT_SOLUTION,
}

export async function simulateIntermediatePipeline(
  onStep: (step: PipelineStep) => void,
): Promise<void> {
  const names = ['Log Analyzer', 'Issue Investigator', 'Solution Specialist']
  const reportKeys = ['log_analysis', 'investigation_report', 'solution_plan']

  for (let i = 0; i < 3; i++) {
    onStep({ step: i + 1, agent_name: names[i]!, status: 'running', output: '' })
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000))
    onStep({ step: i + 1, agent_name: names[i]!, status: 'complete', output: DEMO_REPORTS[reportKeys[i]!]! })
    await new Promise(r => setTimeout(r, 400))
  }
}

export const DEMO_ADVANCED_RESULT: AdvancedResult = {
  company_info: {
    'Name': 'Reliance Industries Limited',
    'Symbol': 'RELIANCE.NS',
    'Price': '₹1,348.10',
    'Market Cap': '₹18.24 Lakh Crore',
    'Sector': 'Energy',
    'Industry': 'Oil & Gas',
    'EPS': '₹61.47',
    'P/E Ratio': '21.93',
    '52W Low': '₹1,114.85',
    '52W High': '₹1,611.80',
    'Gross Margin': '35.78%',
    'EBITDA Margin': '16.44%',
  },
  financial_analysis: `# Financial Analysis — Reliance Industries Ltd (2026)

## Market Position
- **Current Price**: ₹1,348.10 — trading below 50-day (₹1,411.98) and 200-day (₹1,447.78) averages
- **Market Cap**: ₹18.24 Lakh Crore — among the largest in India
- **P/E Ratio**: 21.93 — reasonable for a diversified conglomerate

## Revenue & Profitability Trend
| Metric | FY2023 | FY2024 | FY2025 |
|--------|--------|--------|--------|
| Revenue | ₹8.68L Cr | ₹9.17L Cr | ₹10.11L Cr |
| Net Income | ₹67,437 Cr | ₹72,664 Cr | ₹85,382 Cr |
| EBITDA | ₹1,22,390 Cr | ₹1,38,912 Cr | ₹1,68,451 Cr |

**Revenue CAGR**: ~8% | **Net Income CAGR**: ~13%

## Key Developments
- **$300B US refinery** partnership with AFR — first new US refinery in 50 years
- **Jio IPO** — seeking up to 8% stake placement, significant value unlock expected
- **Cash reserves**: ₹2,23,871 Crore — strong strategic flexibility

## Risks
- Large-scale international project execution risk
- Oil price and geopolitical volatility
- Competition in energy and telecom sectors`,
  investment_recommendation: `Reliance remains a world-class conglomerate with strong fundamentals, but at current valuation levels, the risk-reward is balanced. Existing investors should hold; new investors should wait for a correction before entering.`,
  recommendation_verdict: 'HOLD',
  timing: {
    parallel_time: 2.5,
    analysis_time: 5.0,
    total_time: 9.5,
    time_saved: 2.5,
  },
}

export async function simulateAdvancedPipeline(
  onEvent: (event: Record<string, unknown>) => void,
): Promise<void> {
  onEvent({ type: 'phase_update', phase: 'Financial Data', status: 'running', elapsed: 0 })
  await new Promise(r => setTimeout(r, 800))
  onEvent({ type: 'phase_update', phase: 'News Research', status: 'running', elapsed: 0 })
  await new Promise(r => setTimeout(r, 1200))
  onEvent({ type: 'phase_update', phase: 'Financial Data', status: 'complete', elapsed: 2.0 })
  await new Promise(r => setTimeout(r, 800))
  onEvent({ type: 'phase_update', phase: 'News Research', status: 'complete', elapsed: 2.5 })
  await new Promise(r => setTimeout(r, 600))
  onEvent({ type: 'phase_update', phase: 'Analysis', status: 'running', elapsed: 0 })
  await new Promise(r => setTimeout(r, 2500))
  onEvent({ type: 'phase_update', phase: 'Analysis', status: 'complete', elapsed: 3.0 })
  await new Promise(r => setTimeout(r, 600))
  onEvent({ type: 'phase_update', phase: 'Recommendation', status: 'running', elapsed: 0 })
  await new Promise(r => setTimeout(r, 1800))
  onEvent({ type: 'phase_update', phase: 'Recommendation', status: 'complete', elapsed: 2.0 })
  await new Promise(r => setTimeout(r, 300))
  onEvent({ type: 'result', data: DEMO_ADVANCED_RESULT })
}
