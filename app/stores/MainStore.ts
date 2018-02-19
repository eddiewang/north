import { observable } from 'mobx'

class MainStore {
  @observable public counter = 0
}

const ms = new MainStore()

export default ms
