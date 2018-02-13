package com.cmlteam.flywise.model;

public class ResultStatus {
    private final boolean success;
    private final String error;

    public static final ResultStatus SUCCESS = new ResultStatus(true, null);

    public ResultStatus(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    public static ResultStatus error(String error) {
        return new ResultStatus(false, error);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getError() {
        return error;
    }
}
