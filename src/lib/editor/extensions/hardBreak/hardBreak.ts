import { Extension } from '$lib/editor/core/Extension'
import type { EditorState, Transaction } from 'prosemirror-state'

export const HardBreak = Extension.Create({
  name: 'hard_break',

  type: 'node',

  defineSpec() {
    return {
      inline: true,
      group: 'inline',
      selectable: true,
      atom: true,
      parseDOM: [{ tag: 'br' }],
      toDOM(): readonly [string, ...any[]] {
        return ['br', { class: 'a' }]
      }
    }
  },

  addCommands() {
    return {
      insertHardBreak: (state: EditorState, dispatch: (tr: Transaction) => void) => {
        if (dispatch)
          dispatch(
            state.tr.replaceSelectionWith(state.schema.nodes[this.name].create()).scrollIntoView()
          )
        return true
      }
    }
  },

  addKeyboardShortcuts() {
    return {
      'Shift-Enter': this.editor.commands.insertHardBreak
    }
  }
})
