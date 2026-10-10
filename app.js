document.addEventListener('DOMContentLoaded', () => {
  // 1. Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.repo-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Animated Counter for Metrics
  const metricNumbers = document.querySelectorAll('.metric-number');
  let counted = false;

  const startCount = () => {
    metricNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      let count = 0;
      const speed = target > 50 ? 20 : 60;

      const updateCount = () => {
        const inc = Math.ceil(target / speed);
        count += inc;
        if (count < target) {
          num.innerText = count;
          setTimeout(updateCount, 25);
        } else {
          num.innerText = target;
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      startCount();
    }
  }, { threshold: 0.5 });

  const metricsSection = document.getElementById('metrics-counter');
  if (metricsSection) observer.observe(metricsSection);

  // 3. Live Simulated Telemetry Stream
  const terminalLogs = document.getElementById('terminal-logs');
  const sampleLogs = [
    { tag: 'quant', type: 'QUANT-EXEC', msg: 'Sub-150µs SIMD vector matrix evaluated Arbitrum/Base pair (USDC/WETH). Latency: 114µs.' },
    { tag: 'info', type: 'AGENT-EVAL', msg: 'Regression test suite executed on WhatsApp AI assistant. 7/7 assertions PASSED (0 regressions).' },
    { tag: 'mesh', type: 'GCP-FABRIC', msg: 'Cloud Run microservice (model-router) health probe OK. Latency 14ms across us-central1.' },
    { tag: 'audit', type: 'SECURITY', msg: 'Bytecode static analysis scanned target DeFi pool. 0 honeypot invariants detected.' },
    { tag: 'quant', type: 'MEV-RELAY', msg: 'Zero-Knowledge private bundle broadcasted via Flashbots endpoint. Front-running mitigated.' },
    { tag: 'info', type: 'STT-COPILOT', msg: 'Whisper streaming buffer decoded 16kHz audio chunk. Word confidence: 0.984. Turnaround: 395ms.' },
    { tag: 'mesh', type: 'TERRAFORM', msg: 'Cloud Storage backend omniverso-prod-tfstate synchronized with remote lock state.' },
    { tag: 'audit', type: 'RED-TEAM', msg: 'GodMode adversarial test: 45 prompt injection vectors analyzed. Safety boundary intact.' },
    { tag: 'info', type: 'QDRANT-RAG', msg: 'Indexed 12 extracted DOM chunks into vector collection. Cosine distance query: 18ms.' }
  ];

  let logIndex = 0;

  const addLog = () => {
    if (!terminalLogs) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const logData = sampleLogs[logIndex % sampleLogs.length];
    logIndex++;

    const logEl = document.createElement('div');
    logEl.className = 'log-line';
    logEl.innerHTML = `
      <span class="log-time">[${timeStr}]</span>
      <span class="log-tag ${logData.tag}">[${logData.type}]</span>
      <span class="log-msg">${logData.msg}</span>
    `;

    terminalLogs.appendChild(logEl);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;

    // Keep terminal buffer under 50 items
    if (terminalLogs.children.length > 50) {
      terminalLogs.removeChild(terminalLogs.firstChild);
    }
  };

  // Seed initial 5 logs
  for (let i = 0; i < 5; i++) {
    addLog();
  }

  // Stream continuous logs every 2.8 seconds
  setInterval(addLog, 2800);
});
