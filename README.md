# guess-mine
Realtime drawing game with SocketIO, Gulp and Node

### 남은 일
- timeout 시간 보이기  [x]
- paint 에러 수정 [x] 
    * 그리는 쪽의 색상이 반영안됌. -> strokePath에서 color 값을 넘겨주지 않았음
- 새로고침시 timeout/interval 이 여러개 돌아가는 문제 수정 [x]
    * clearGame 함수를 통해 해결

- ready/start 기능 [ ]
    * 방장 필요 [x]
        * 게임에서 이긴 사람이 방장
        * timeout 이면 painter가 방장
        * 방장이 나가면 랜덤으로 방장 선정
    * 방장은 start 버튼, 그 외 ready 버튼 클릭 가능
        * 모두 ready 버튼을 눌렀을 때 방장의 start 버튼 활성화
        * start 버튼이 클릭되면 게임 시작
        * 2명 이상부터 게임 시작 가능
    * 게임 중 새로운 플레이어가 입장시 게임이 끝나야 참여 가능