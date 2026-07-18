import { lazy, Suspense, type ComponentType } from 'react';

const ChartsDemo = lazy(() => import('./ChartsDemo'));
const CanvasDemo = lazy(() => import('./CanvasDemo'));
const ChatDemo = lazy(() => import('./ChatDemo'));
const TerminalDemo = lazy(() => import('./TerminalDemo'));
const KanbanDemo = lazy(() => import('./KanbanDemo'));
const CodePlayground = lazy(() => import('./CodePlayground'));
const QuizDemo = lazy(() => import('./QuizDemo'));
const AuthDemo = lazy(() => import('./AuthDemo'));
const PipelineDemo = lazy(() => import('./PipelineDemo'));
const TrackerDemo = lazy(() => import('./TrackerDemo'));
const VisionDemo = lazy(() => import('./VisionDemo'));
const BookingDemo = lazy(() => import('./BookingDemo'));
const ShopDemo = lazy(() => import('./ShopDemo'));
const MonitorDemo = lazy(() => import('./MonitorDemo'));
const AITextDemo = lazy(() => import('./AITextDemo'));
const PipelineBuilderDemo = lazy(() => import('./PipelineBuilderDemo'));
const InvoiceDemo = lazy(() => import('./InvoiceDemo'));
const ComponentShowcase = lazy(() => import('./ComponentShowcase'));
const CryptoDemo = lazy(() => import('./CryptoDemo'));
const MobilePreview = lazy(() => import('./MobilePreview'));
const MapDemo = lazy(() => import('./MapDemo'));
const ScannerDemo = lazy(() => import('./ScannerDemo'));
const DocumentDemo = lazy(() => import('./DocumentDemo'));
const BlockchainDemo = lazy(() => import('./BlockchainDemo'));
const IoTDemo = lazy(() => import('./IoTDemo'));
const CodeReviewDemo = lazy(() => import('./CodeReviewDemo'));
const MiniGameDemo = lazy(() => import('./MiniGameDemo'));
const DoraMetricsDemo = lazy(() => import('./DoraMetricsDemo'));
const JournalDemo = lazy(() => import('./JournalDemo'));
const TestResultsDemo = lazy(() => import('./TestResultsDemo'));
const VoiceDemo = lazy(() => import('./VoiceDemo'));
const GanttDemo = lazy(() => import('./GanttDemo'));
const TorrentDemo = lazy(() => import('./TorrentDemo'));
const VaultDemo = lazy(() => import('./VaultDemo'));
const CryptoMarketDemo = lazy(() => import('./CryptoMarketDemo'));
const WalletDemo = lazy(() => import('./WalletDemo'));
const CodingAgentDemo = lazy(() => import('./CodingAgentDemo'));

function DemoLoader() {
  return (
    <div className="liquid-glass rounded-2xl p-12 flex items-center justify-center">
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-blue)] animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-pink)] animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-blue)] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

const demoMap: Record<string, ComponentType> = {
  charts: ChartsDemo,
  canvas: CanvasDemo,
  chat: ChatDemo,
  terminal: TerminalDemo,
  kanban: KanbanDemo,
  codeplayground: CodePlayground,
  quiz: QuizDemo,
  auth: AuthDemo,
  pipeline: PipelineDemo,
  tracker: TrackerDemo,
  vision: VisionDemo,
  booking: BookingDemo,
  shop: ShopDemo,
  monitor: MonitorDemo,
  aitext: AITextDemo,
  pipelinebuilder: PipelineBuilderDemo,
  invoice: InvoiceDemo,
  componentshowcase: ComponentShowcase,
  crypto: CryptoDemo,
  mobilepreview: MobilePreview,
  map: MapDemo,
  scanner: ScannerDemo,
  document: DocumentDemo,
  blockchain: BlockchainDemo,
  iot: IoTDemo,
  codereview: CodeReviewDemo,
  minigame: MiniGameDemo,
  dorametrics: DoraMetricsDemo,
  journal: JournalDemo,
  testresults: TestResultsDemo,
  voice: VoiceDemo,
  gantt: GanttDemo,
  torrent: TorrentDemo,
  vault: VaultDemo,
  cryptomarket: CryptoMarketDemo,
  wallet: WalletDemo,
  codingagent: CodingAgentDemo,
};

export function DemoComponent({ demoType }: { demoType: string }) {
  const Demo = demoMap[demoType];
  if (!Demo) return <DemoLoader />;
  return (
    <Suspense fallback={<DemoLoader />}>
      <Demo />
    </Suspense>
  );
}
