function findPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 참고 항목 변수
            let bjdCode = data.bcode.toString().slice(5);
            let sgCode = data.sigunguCode;
            let jibunMain = data.buildingCode.toString().substr(11, 4);
            let jibunSub = data.buildingCode.toString().substr(15, 4);

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

            // 다음 API 리턴값 표시
            document.getElementById("bjdCode").value = bjdCode;
            document.getElementById("sgCode").value = sgCode;
            document.getElementById("jibunMain").value = jibunMain;
            document.getElementById("jibunSub").value = jibunSub;

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

            // 모든 항목을 표시한 후 openAPI Request
            openAPI(sgCode, bjdCode, jibunMain, jibunSub);
        }
    }).open({
        autoClose: true
    });
}

function openAPI(sgCode, bdCode, bun, ji) {

    let API_KEY = '8hWTxjOSsGimA5pB6AwPWTkEFTNXJEo7F3AJlEk45vT8QvjKkHokE1o%2BVbLNfLW6nShurD4JAU2q7IzoW%2FhL7Q%3D%3D';

    //openAPI의 엔드포인트
    let openapiURL = `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?sigunguCd=${sgCode}&bjdongCd=${bdCode}&bun=${bun}&ji=${ji}&ServiceKey=${API_KEY}&_type=json`;
    fetch(openapiURL)
        .then((res) => res.json())
        .catch((err) => console.log("error:", err));
    
}