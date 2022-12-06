function findPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 참고 항목 변수
            let bjdCode = data.bcode;
            let sgCode = data.sigunguCode;
            let jibunAddr = data.jibunAddress;
            let jibunParsed = '';
            let bunParsed = '';
            let jiParsed = '';

            // 부번의 존재여부를 체크한다.
            if (/-/.test(jibunAddr)) {
                // 부번이 존재하는 경우 하이픈을 기준으로 본번과 부번을 나눈다.
                jibunParsed = jibunAddr.match(/\d{1,4}-\d{1,4}/);
                let temp = jibunParsed.toString().split('-', 2);
                // 본번과 부번을 각각의 변수에 할당한다.
                // 각각 zero fill 하여 4자리를 맞춰준다.
                bunParsed = temp[0].padStart(4, '0');
                jiParsed = temp[1].padStart(4, '0');
            } else {
                // 부번이 존재하지 않는 경우
                jibunParsed = jibunAddr.match(/\d{1,4}$/);
                bunParsed = jibunParsed.toString().padStart(4, '0');
            }

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("sample4_roadAddress").value = roadAddr;
            document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            document.getElementById("bjdCode").value = bjdCode;
            document.getElementById("sgCode").value = sgCode;
            document.getElementById("jibun").value = jibunParsed;
            document.getElementById("jibunMain").value = bunParsed;
            document.getElementById("jibunSub").value = jiParsed;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if (roadAddr !== '') {
                document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            } else {
                document.getElementById("sample4_extraAddress").value = '';
            }

            let guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if (data.autoRoadAddress) {
                let expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            } else if (data.autoJibunAddress) {
                let expJibunAddr = data.autoJibunAddress;
                guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                guideTextBox.style.display = 'block';
            } else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}