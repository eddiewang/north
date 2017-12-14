import { observable } from 'mobx'

class MainStore {
  @observable counter = 0
}

const ms = new MainStore()

export default ms
