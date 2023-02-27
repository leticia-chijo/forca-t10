import palavras from "./palavras"
import alfabeto from "./alfabeto"
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"
import { useState } from "react"

const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]

export default function App() {
  const [erros, setErros] = useState(0)
  const [palavraEscolhida, setPalavraEscolhida] = useState([])
  const [palavraJogo, setPalavraJogo] = useState([])
  const [letrasUsadas, setLetrasUsadas] = useState(alfabeto)
  const [corPalavra, setCorPalavra] = useState("preto")

  function iniciarJogo() {
    setErros(0)
    setLetrasUsadas([])
    setCorPalavra("preto")
    sortearPalavra()
  }

  function finalizarJogo() {
    setPalavraJogo(palavraEscolhida)
    setLetrasUsadas(alfabeto)
  }

  function sortearPalavra() {
    const i = Math.floor(Math.random() * palavras.length)
    const palavra = palavras[i]
    console.log(palavra)

    const palavraArray = palavra.split("")
    setPalavraEscolhida(palavraArray)

    let tracinhos = []
    palavraArray.forEach(() => tracinhos.push(" _"))
    setPalavraJogo(tracinhos)
  }

  function clicarLetra(letra) {
    setLetrasUsadas([...letrasUsadas, letra])

    if (palavraEscolhida.includes(letra)) {
      acertouLetra(letra)
    } else {
      errouLetra(letra)
    }

  }

  function acertouLetra(letra) {
    const novaPalavraJogo = [...palavraJogo]

    palavraEscolhida.forEach((l, i) => {
      if (l === letra) {
        novaPalavraJogo[i] = letra
      }
    })

    setPalavraJogo(novaPalavraJogo)

    // ganhou?
    if (!novaPalavraJogo.includes(" _")) {
      setCorPalavra("verde")
      finalizarJogo()
    }
  }

  function errouLetra(letra) {
    const novosErros = erros + 1
    setErros(novosErros)

    // perdeu?
    if (novosErros === 6) {
      setCorPalavra("vermelho")
      finalizarJogo()
    }
  }

  return (
    <div className="container-tela">

      <div className="container-forca">
        <img src={imagens[erros]} alt="forca" data-test="game-image" />
        <button onClick={iniciarJogo} data-test="choose-word">Escolher Palavra</button>
        <h1 className={corPalavra} data-test="word">{palavraJogo}</h1>
      </div>

      <div className="container-letras">
        {alfabeto.map((letra) => (
          <button
            key={letra}
            disabled={letrasUsadas.includes(letra)}
            data-test="letter"
            onClick={() => clicarLetra(letra)}
          >
            {letra}
          </button>
        ))}
      </div>

    </div>
  )
}