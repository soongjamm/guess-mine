(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("./login");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzQ4MTY1MzMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9sb2dpbic7Il19
},{"./login":2}],2:[function(require,module,exports){
"use strict";

var body = document.querySelector('body');
var loginForm = document.getElementById('jsLogin');
var LOGGED_OUT = 'loggedOut';
var LOGGED_IN = 'loggedIn';
var NICKNAME = 'nickname';
var nickname = localStorage.getItem(NICKNAME);

var logIn = function logIn(nickname) {
  events.socket = io('/');
  events.socket.emit(window.events.setNickname, {
    nickname: nickname
  });
};

var handleFormSubmit = function handleFormSubmit(e) {
  e.preventDefault();
  var input = loginForm.querySelector('input');
  var value = input.value; // input.value와 같다.

  input.value = "";
  localStorage.setItem(NICKNAME, value);
  logIn(value);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

if (loginForm) {
  loginForm.addEventListener('submit', handleFormSubmit);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsIkxPR0dFRF9PVVQiLCJMT0dHRURfSU4iLCJOSUNLTkFNRSIsIm5pY2tuYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvZ0luIiwiZXZlbnRzIiwic29ja2V0IiwiaW8iLCJlbWl0Iiwid2luZG93Iiwic2V0Tmlja25hbWUiLCJoYW5kbGVGb3JtU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiaW5wdXQiLCJ2YWx1ZSIsInNldEl0ZW0iLCJjbGFzc05hbWUiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE1BQXZCLENBQWI7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixTQUF4QixDQUFsQjtBQUVBLElBQU1DLFVBQVUsR0FBRyxXQUFuQjtBQUNBLElBQU1DLFNBQVMsR0FBRyxVQUFsQjtBQUNBLElBQU1DLFFBQVEsR0FBRyxVQUFqQjtBQUVBLElBQU1DLFFBQVEsR0FBR0MsWUFBWSxDQUFDQyxPQUFiLENBQXFCSCxRQUFyQixDQUFqQjs7QUFFQSxJQUFNSSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFDSCxRQUFELEVBQWM7QUFDeEJJLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQkMsRUFBRSxDQUFDLEdBQUQsQ0FBbEI7QUFDQUYsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNFLElBQWQsQ0FBbUJDLE1BQU0sQ0FBQ0osTUFBUCxDQUFjSyxXQUFqQyxFQUE4QztBQUFFVCxJQUFBQSxRQUFRLEVBQVJBO0FBQUYsR0FBOUM7QUFDSCxDQUhEOztBQUtBLElBQU1VLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsQ0FBRCxFQUFPO0FBQzVCQSxFQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSxNQUFNQyxLQUFLLEdBQUdsQixTQUFTLENBQUNELGFBQVYsQ0FBd0IsT0FBeEIsQ0FBZDtBQUY0QixNQUdwQm9CLEtBSG9CLEdBR1ZELEtBSFUsQ0FHcEJDLEtBSG9CLEVBR0o7O0FBQ3hCRCxFQUFBQSxLQUFLLENBQUNDLEtBQU4sR0FBYyxFQUFkO0FBQ0FiLEVBQUFBLFlBQVksQ0FBQ2MsT0FBYixDQUFxQmhCLFFBQXJCLEVBQStCZSxLQUEvQjtBQUNBWCxFQUFBQSxLQUFLLENBQUNXLEtBQUQsQ0FBTDtBQUNILENBUEQ7O0FBU0EsSUFBSWQsUUFBUSxLQUFLLElBQWpCLEVBQXVCO0FBQ25CUixFQUFBQSxJQUFJLENBQUN3QixTQUFMLEdBQWlCbkIsVUFBakI7QUFDSCxDQUZELE1BRU87QUFDSEwsRUFBQUEsSUFBSSxDQUFDd0IsU0FBTCxHQUFpQmxCLFNBQWpCO0FBQ0FLLEVBQUFBLEtBQUssQ0FBQ0gsUUFBRCxDQUFMO0FBQ0g7O0FBRUQsSUFBSUwsU0FBSixFQUFlO0FBQ1hBLEVBQUFBLFNBQVMsQ0FBQ3NCLGdCQUFWLENBQTJCLFFBQTNCLEVBQXFDUCxnQkFBckM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5jb25zdCBsb2dpbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNMb2dpbicpO1xuXG5jb25zdCBMT0dHRURfT1VUID0gJ2xvZ2dlZE91dCc7XG5jb25zdCBMT0dHRURfSU4gPSAnbG9nZ2VkSW4nO1xuY29uc3QgTklDS05BTUUgPSAnbmlja25hbWUnO1xuXG5jb25zdCBuaWNrbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKE5JQ0tOQU1FKTtcblxuY29uc3QgbG9nSW4gPSAobmlja25hbWUpID0+IHtcbiAgICBldmVudHMuc29ja2V0ID0gaW8oJy8nKTtcbiAgICBldmVudHMuc29ja2V0LmVtaXQod2luZG93LmV2ZW50cy5zZXROaWNrbmFtZSwgeyBuaWNrbmFtZSB9KTtcbn1cblxuY29uc3QgaGFuZGxlRm9ybVN1Ym1pdCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGlucHV0ID0gbG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gaW5wdXQgLy8gaW5wdXQudmFsdWXsmYAg6rCZ64ukLlxuICAgIGlucHV0LnZhbHVlID0gXCJcIjtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOSUNLTkFNRSwgdmFsdWUpO1xuICAgIGxvZ0luKHZhbHVlKTtcbn1cblxuaWYgKG5pY2tuYW1lID09PSBudWxsKSB7XG4gICAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfT1VUO1xufSBlbHNlIHtcbiAgICBib2R5LmNsYXNzTmFtZSA9IExPR0dFRF9JTjtcbiAgICBsb2dJbihuaWNrbmFtZSk7XG59XG5cbmlmIChsb2dpbkZvcm0pIHtcbiAgICBsb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlRm9ybVN1Ym1pdCk7XG59XG4iXX0=
},{}]},{},[1])