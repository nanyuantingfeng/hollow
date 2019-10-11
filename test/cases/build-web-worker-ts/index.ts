import AWorker from './a.worker'

const worker = new AWorker()

worker.aaaa().then(f => {})

worker.bbbb().then(f => {})

worker.cccc().then(f => {})

worker.terminate()
