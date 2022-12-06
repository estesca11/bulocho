str1 = '12-12';
str2 = '123-12';
str3 = '12-123';
str4 = '1234-1';
str5 = '1234-12';
str6 = '1234-123';
str7 = '1234-1234';
if (/-/.test(jibunAddr)) {
    jibunParsed = jibunAddr.match(/\d{0,5}-\d{0,5}/);
    // 하이픈을 기준으로 본번과 부번을 나눈다.
    bunParsed = jibunParsed[0].slice(0, jibunParsed.indexOf('-')-2);
    jiParsed = jibunParsed[0].slice(jibunParsed.indexOf('-'))-1;
} else {
    bunParsed = jibunAddr.match(/\d{1,4}$/);
    jibunParsed = bunParsed;
}