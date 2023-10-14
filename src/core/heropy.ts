///// Component /////
interface ComponentPaload{
  tagName?: string//tagName,props,state는 데이터가 안들어올수도 있느이 optioanl chaning으로 초기화
  props?: {
    //key value 형식의 객체에 type을 지정해야 하니 인덱스 시그니처 이용
    //key 값은 string 형식이고, 들어오는 value는 unknown 형식
    [key: string]: unknown, 
  }
  state?:{
    [key:string]: unknown
  }
}

export class Component {
  // 클래스 안에 선언된 this 키워드의 속성들의 타입은 class body 안에 선언되어야 함
  //명시적으로 속성의 접근 제어자를 붙여 주는게 좋음
  public el
  public props
  public state
  constructor(payload:ComponentPaload = {}) {
    const {
      tagName = 'div', // 최상위 요소의 태그 이름
      props = {},
      state = {}
    } = payload
    this.el = document.createElement(tagName) // 컴포넌트의 최상위 요소
    this.props = props // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.state = state // 컴포넌트 안에서 사용할 데이터
    this.render()
  }
  render() { // 컴포넌트를 렌더링하는 함수
    // ...
  }
}
  
  
///// Router /////
interface Route{
  path:string
  component: typeof Component // 이부분이 특이함 component는 클래스인데, 굳이 typeof를 이용해 명시함
}
type Routes = Route[]
// 페이지 렌더링!
function routeRender(routes:Routes) {
  // 접속할 때 해시 모드가 아니면(해시가 없으면) /#/로 리다이렉트!
  if (!location.hash) {
    history.replaceState(null, '', '/#/') // (상태, 제목, 주소)
  }
  const routerView = document.querySelector('router-view')
  const [hash, queryString = ''] = location.hash.split('?') // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분

  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query{
    [key: string]: string
  }
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      //reduce 함수의 두번째 매개변수로 {}가 들어갔는데, 빈객체 내용으로 들어가 있기에 타입스크립트가 판단하길 어떠한 내용도 들어갈 수 없다 판단함
      //대괄호 표기법으로 인덱싱 하고 있음
      acc[key] = value 
      return acc
    }, {} as Query)
  history.replaceState(query, '') // (상태, 제목)

  // 2) 현재 라우트 정보를 찾아서 렌더링!
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  if(routerView){
    routerView.innerHTML = ''
    currentRoute && routerView.append(new currentRoute.component().el)
  }
  

  // 3) 화면 출력 후 스크롤 위치 복구!
  window.scrollTo(0, 0)
}
export function createRouter(routes:Routes) {
  // 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}
  
  
  ///// Store /////
  interface StoreObservers{
    //key는 객체 데이터의 속성, 값은 감시 해서 실행하려는 콜백 함수
    //interface index signature 형식 이용
    //index 이름은 key이고, 'key'라는 이름을 가진index 형식은 string으로 구성되어 있다. 
    //이 index에 해당하는 값이 반환 하는 내용은 SubscribeCallback 형식이다.
    [key: string]:SubscribeCallback[]
  }
  interface SubscribeCallback{
    //interface 함수 형식 이용
    //파라미터 이름은 arg이고, arg로 들어올 내용을 뭐가 될지 몰라서 unknown을 이용함
    // 함수를 실행하는거니 반환 내용은 없음
    (arg: unknown):void
  }
  export class Store <S>{
    public state = {} as S// 상태(데이터)
    private observers = {} as StoreObservers
    constructor(state:S) {
      
      for (const key in state) {
        // 각 상태에 대한 변경 감시(Setter) 설정!
        Object.defineProperty(this.state, key, {
          // Getter
          get: () => state[key],
          // Setter
          set: val => {
            state[key] = val
            if (Array.isArray(this.observers[key])) { // 호출할 콜백이 있는 경우!
              this.observers[key].forEach(observer => observer(val)) //배열 element가 콜백 함수 임, 그래서 (val) 넣을 수 있음
            }
          }
        })
      }
    }
    // 상태 변경 구독!
    subscribe(key: string, cb: SubscribeCallback) { //key는 구독할 상태의 이름이 담겨 있고, 콜백은 상태가 바뀔 때 마다 실행하는 함수가 들어 있음
      Array.isArray(this.observers[key]) // 이미 등록된 콜백이 있는지 확인!
        ? this.observers[key].push(cb) // 있으면 새로운 콜백 밀어넣기!
        : this.observers[key] = [cb] // 없으면 콜백 배열로 할당!
  
      // 예시)
      // observers = {
      //   구독할상태이름: [실행할콜백1, 실행할콜백2]
      //   movies: [cb, cb, cb],
      //   message: [cb]
      // }
    }
  }