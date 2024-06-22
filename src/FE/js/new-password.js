/** X 버튼 클릭 시 이전 페이지로 이동 */
const onCloseButton = document.querySelector('.head-x-button');

onCloseButton.addEventListener('click', () => {
    // 이전 페이지로 이동 => 메인 페이지로 이동
    window.location.href = '/';
});

/** 임시 비밀번호로 로그인 후 비밀번호 변경 요청(변경할 때까지 계속 요청 시도함) */
const change = document.querySelector('.change');
change.addEventListener('click', async () => {
    const password = document.getElementById('password-input').value;
    const password_confirm = document.getElementById('password-new-input').value;

    await fetch('/login/temppw/change',{
        method: "POST",
        body: JSON.stringify({password, password_confirm}),
            headers: {
                'Content-Type': 'application/json'
            }
    })
    .then(res => res.json())
    .then(res => {
        if(res.code === 400){
            alert(res.message);
        } else if(res.code === 200){
            alert(res.message);
            window.location.href = '/';
        }
    })
});