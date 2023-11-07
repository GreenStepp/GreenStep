package com.mm.greenstep.domain.common.oauth;

import com.mm.greenstep.domain.common.jwt.JwtTokenProvider;
import com.mm.greenstep.domain.user.dto.request.UserReqDto;
import com.mm.greenstep.domain.user.dto.response.Response;
import com.mm.greenstep.domain.user.dto.response.UserResDto;
import com.mm.greenstep.domain.user.entity.User;
import com.mm.greenstep.domain.user.enums.Authority;
import com.mm.greenstep.domain.user.repository.TeamRepository;
import com.mm.greenstep.domain.user.repository.UserRepository;
import com.mm.greenstep.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;

import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeamRepository teamRepository;

    public String findKakaoId(String token) {

        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            log.info("response body : " + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String kakaoId = element.getAsJsonObject().get("id").toString();
            log.info("id : " + kakaoId);
            br.close();

            return kakaoId;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ResponseEntity<?> findUserByKakaoId(String kakaoId){
        // 회원가입
        Optional<User> user = userRepository.findByUserName(kakaoId);

        if (user.isEmpty()) {
            log.info("회원 없음");

            // 회원 닉네임 랜덤 설정
            String randomNick = randomNickname();
            while(!userRepository.findByNickName(randomNick).isEmpty()){
                randomNick = randomNickname();
            }


            User saveUser = User.builder()
                    .userName(kakaoId)
                    .password(passwordEncoder.encode("kakao"))
                    .team(teamRepository.findById(randomTeam()).orElseThrow())  //랜덤 팀
                    .nickName(randomNick)   //랜덤 닉네임
                    .build();

            saveUser.getRoles().add(Authority.ROLE_USER.name());
            userRepository.save(saveUser);


        }
        else{
            log.info(user.get().getUsername()+"회원 있음");
        }

        UserReqDto.OAuthLogin login = new UserReqDto.OAuthLogin();

        login.setEmail(kakaoId);
        login.setPassword("kakao");
        login.setUserId(user.get().getUserId());

        return userService.oAuthLogin(login);
    }


    /**
     * 랜덤 팀을 위한 함수
     * @return
     */
    public int randomTeam(){
        Random random = new Random();
        // 0과 99 사이의 랜덤한 정수
        int randomInt = random.nextInt(100);
        return (randomInt % 2) + 1;
    }


    /**
     * 랜덤 닉네임 생성
     */
    public String randomNickname(){
        String[] animals = {"해달","쿼카","독수리","나무늘보","돌고래","호랭이"};

        Random random = new Random();
        int randomAnimals = random.nextInt(6); // 0~5
        // 0과 99 사이의 랜덤한 정수
        int randomInt = random.nextInt(100000);

        return new String(animals[randomAnimals]+randomInt);
    }

}
