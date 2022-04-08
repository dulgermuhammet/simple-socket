import * as shell from "shelljs";

shell.cp("-R", "src/static/", "dist/static/");
shell.cp("-R", "src/views/", "dist/views/");