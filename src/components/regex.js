function replace(string) {
    const regex = /\<.*?\>/ig
    return string.replaceAll(regex, '')
}

console.log(replace("<p>Sellador Acrilico X 30 L Wassington</p>\n\n<p>El SELLADOR ACRÍLICO Wassington es un producto desarrollado para sellar pisos porosos y permitir un perfecto anclaje de las ceras en el posterior encerado.</p>\n\n<p>El proceso de sellado reduce el consumo de ceras ya que genera una superficie lisa y adherente.<br>\nEs ideal para mosaicos, lajas, alisados de cementos, cerámicos no esmaltados, etc.</p>\n"))