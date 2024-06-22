/** X 버튼 클릭 시 이전 페이지로 이동 */
const onCloseButton = document.querySelector('.head-x-button');

onCloseButton.addEventListener('click', () => {
    // 이전 페이지로 이동 => 메인 페이지로 이동
    window.location.href = '/login';
});

/** 비밀번호 찾기 페이지에서 비밀번호 찾기 버튼 클릭 시 임시비밀번호 전송 */
const emailInput2 = document.getElementById('email-input2');
const find = document.querySelector('.find');
find.addEventListener('click', async () => {
    // 버튼 비활성화
    find.style.color = "black";
    find.style.background = "black";
    find.disabled = true;

    setTimeout(async () => {
        const email = emailInput2.value;
        await fetch('/login/temppw',{
            method: "POST",
            body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then(res => res.json())
        .then(res => {
            if(res.code === 404){
                alert(res.message);
                find.style.color = "white";
                find.style.background = "rgb(251, 146, 60)";
                find.disabled = false;
            } else if(res.code === 400){
                alert(res.message);
                find.style.color = "white";
                find.style.background = "rgb(251, 146, 60)";
                find.disabled = false;
            } else if(res.code === 200){
                alert(res.message);
                window.location.href = '/';
            }
        })
    }, 1000);
    // 임시 비밀번호 요청
    
});