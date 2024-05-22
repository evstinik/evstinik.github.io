import type { ShikiTransformer } from 'shiki'

export function parseMetaFocusString(meta: string) {
  if (!meta) return null
  const match = meta.match(/\{([\d,-]+)\}/)
  if (!match) return null
  const lines = match[1].split(',').flatMap((v) => {
    const num = v.split('-').map((v) => Number.parseInt(v, 10))
    if (num.length === 1) return [num[0]]
    else return Array.from({ length: num[1] - num[0] + 1 }, (_, i) => i + num[0])
  })
  return lines
}

export interface TransformerMetaFocusOptions {
  /**
   * Class for highlighted lines
   *
   * @default 'focused'
   */
  className?: string
}

const symbol = Symbol('focused-lines')

/**
 * Allow using `{1,3-5}` in the code snippet meta to mark highlighted lines.
 */
export function transformerMetaFocus(options: TransformerMetaFocusOptions = {}): ShikiTransformer {
  const { className = 'focused' } = options

  return {
    name: '@shikijs/transformers:meta-focus',
    code(node) {
      if (!this.options.meta?.__raw) return
      ;(this.meta as any)[symbol] ||= parseMetaFocusString(this.options.meta.__raw)
      const lines: number[] = (this.meta as any)[symbol] || []
      if (lines.length > 0) {
        this.addClassToHast(node, 'has-focus')
      }
    },
    line(node, line) {
      if (!this.options.meta?.__raw) return
      ;(this.meta as any)[symbol] ||= parseMetaFocusString(this.options.meta.__raw)
      const lines: number[] = (this.meta as any)[symbol] || []
      if (lines.includes(line)) this.addClassToHast(node, className)
      return node
    }
  }
}
