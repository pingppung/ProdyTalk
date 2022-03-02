package com.example.ProdyTalk.dto;

public class UserForm {
    private String user_id;
    private String user_pwd;

    public UserForm(String user_id, String user_pwd) {
        this.user_id = user_id;
        this.user_pwd = user_pwd;
    }

    @Override
    public String toString() {
        return "user_id='" + user_id + '\'' +
                ", user_pwd='" + user_pwd + '\'';
    }
}
