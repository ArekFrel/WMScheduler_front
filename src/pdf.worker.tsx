export default class PDFWorker extends Worker {
  constructor() {
    super(new URL('/pdf.worker.min.js', import.meta.url), { type: 'module' });
  }
}
