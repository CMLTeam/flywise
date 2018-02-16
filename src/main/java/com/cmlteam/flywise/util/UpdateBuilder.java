package com.cmlteam.flywise.util;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

public class UpdateBuilder {
    private final String tableName;
    private final List<String> cols = new ArrayList<>();
    private final List<Object> args = new ArrayList<>();
    private String wherePart;
    private Object[] whereArgs;

    public UpdateBuilder(String tableName) {
        this.tableName = tableName;
    }

    public UpdateBuilder set(String key, Object value) {
        cols.add(key);
        args.add(value);
        return this;
    }

    public UpdateBuilder where(String wherePart, Object... args) {
        this.wherePart = wherePart;
        this.whereArgs = args;
        return this;
    }

    public UpdateBuilder whereId(String idColumn, Object value) {
        return where(idColumn + "=?", value);
    }

    public UpdateBuilder whereId(Object value) {
        return whereId("id", value);
    }

    public String buildQuery() {
        StringBuilder res = new StringBuilder("update ").append(tableName).append(" set ");
        for (String col : cols) {
            res.append(col).append("=?,");
        }
        res.setLength(res.length() - 1);
        res.append(" where ").append(wherePart);
        return res.toString();
    }

    public Object[] buildArgs() {
        List<Object> res = new ArrayList<>(args.size() + whereArgs.length);
        res.addAll(args);
        for (Object whereArg : whereArgs) {
            res.add(whereArg);
        }
        return res.toArray();
    }

    public void execute(JdbcTemplate jdbcTemplate) {
        jdbcTemplate.update(buildQuery(), buildArgs());
    }
}
