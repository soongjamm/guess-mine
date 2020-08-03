# guess-mine
Realtime drawing game with SocketIO, Gulp and Node

### 남은 일
- timeout 시간 보이기  [x]
- paint 에러 수정 [x] 
    * 그리는 쪽의 색상이 반영안됌. -> strokePath에서 color 값을 넘겨주지 않았음
- 새로고침시 timeout/interval 이 여러개 돌아가는 문제 수정 [x]
    * clearGame 함수를 통해 해결

- ready/start 기능 [ ]