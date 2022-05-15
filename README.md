## 영화 검색 앱

### 배포 : https://silver-cannoli-998729.netlify.app/

- Recoil을 사용했습니다.
- 검색 기능
  - SearchBar 컴포넌트 : 검색어를 입력받습니다.
  - SearchResult 컴포넌트 : 입력받은 검색어로 결과를 조회합니다. 무한 스크롤을 적용했습니다.
- 즐겨찾기 기능
  - FavorContent 컴포넌트 : 즐겨찾기된 영화를 조회합니다. localStorage를 이용했습니다.
- 공통 컴포넌트
  - List 컴포넌트 : 검색 기능과 즐겨찾기 기능에서 영화 데이터를 받아 출력합니다.
  - Item 컴포넌트 : List 컴포넌트에서 하나의 아이템을 나타냅니다. 클릭하면 Modal 컴포넌트를 통해 즐겨찾기 추가, 제거할 수 있습니다.
  - Modal 컴포넌트 : Portal을 이용했습니다.
