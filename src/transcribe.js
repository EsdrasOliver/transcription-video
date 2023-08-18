import { pipeline } from '@xenova/transformers'
import { loadingMessage } from './loading'

let data = null
//import data from './data.json'

export async function transcribeAudio() {
    const options = {
        chunk_length_s: 30, 
        stride_length_s: 5,
        languege: 'portuguese',
        task: 'transcribe',
        return_timestamps: true
    }

    try {
        console.time()
        loadingMessage('Iniciando a transcrição de áudio, essa parte é bem demorada... aguarde!')
        console.log('[START_TRANSCRIBE]')

        const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')
        data = await transcriber('../audio.mp3', options)
    } catch (error) {
        console.log('[ERROR_TRANSCRIBE]', error)
        throw new Error(error)
    } finally {
        console.timeEnd()
        loadingMessage('Transcrição terminada!')
        console.log('[STOP_TRANSCRIBE]')
        return data
    }
}