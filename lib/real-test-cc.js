'use babel';

import RealTestCcView from './real-test-cc-view';
import { CompositeDisposable } from 'atom';

export default {

  realTestCcView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.realTestCcView = new RealTestCcView(state.realTestCcViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.realTestCcView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'real-test-cc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.realTestCcView.destroy();
  },

  serialize() {
    return {
      realTestCcViewState: this.realTestCcView.serialize()
    };
  },

  toggle() {
    console.log('RealTestCc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
