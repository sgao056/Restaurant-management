package com.ucareer.backend;

public class ResponseBody<T> {

    private String message;
    private T result;
    private Exception error;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public Exception getError() {
        return error;
    }

    public void setError(Exception error) {
        this.error = error;
    }
}
