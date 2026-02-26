import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout("./routes/home.tsx", [
        index("./routes/index.tsx"),
        route("contactus", "./routes/contactus.tsx"),
    ])
] satisfies RouteConfig;

