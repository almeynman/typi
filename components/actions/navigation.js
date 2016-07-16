import { Subject } from 'rxjs'

const navigation = {
  setTab$: new Subject,
  push$: new Subject,
  setTodosSelectedIndex$:new Subject,
}

export default navigation
