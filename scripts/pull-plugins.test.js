const rewire = require("rewire")
const pull_plugins = rewire("./pull-plugins")
const initRepo = pull_plugins.__get__("initRepo")
const pullOne = pull_plugins.__get__("pullOne")
const removeVersionDir = pull_plugins.__get__("removeVersionDir")
// @ponicode
describe("initRepo", () => {
    test("0", async () => {
        await initRepo("4f5486e871a8d20c1762510ae758295abd96b149", "https://croplands.org/app/a/reset?token=")
    })

    test("1", async () => {
        await initRepo("f90c0f0c1ec6b123aaca81576a3011f68c2132ab", "http://www.croplands.org/account/confirm?t=")
    })

    test("2", async () => {
        await initRepo("f90c0f0c1ec6b123aaca81576a3011f68c2132ab", "www.google.com")
    })

    test("3", async () => {
        await initRepo("4e434b420f15055bfb8fe895dd60c355e72f298a", "http://base.com")
    })

    test("4", async () => {
        await initRepo("350e8915fad9bc84f123148c50294786840a4821", "https://accounts.google.com/o/oauth2/revoke?token=%s")
    })

    test("5", async () => {
        await initRepo(undefined, undefined)
    })
})

// @ponicode
describe("pullOne", () => {
    test("0", async () => {
        await pullOne("e1c52c711a627fcb58cddbde129bbdc296e0f0e6", "rgb(0.1,0.2,0.3)", 0, 100, "http://www.example.com/route/123?foo=bar")
    })

    test("1", async () => {
        await pullOne("4e434b420f15055bfb8fe895dd60c355e72f298a", "green", 1, 65, "https://croplands.org/app/a/confirm?t=")
    })

    test("2", async () => {
        await pullOne("350e8915fad9bc84f123148c50294786840a4821", "rgb(20%,10%,30%)", 100, 1, "https://croplands.org/app/a/reset?token=")
    })

    test("3", async () => {
        await pullOne("e1c52c711a627fcb58cddbde129bbdc296e0f0e6", "#FF00FF", 1, 1, "https://api.telegram.org/")
    })

    test("4", async () => {
        await pullOne("350e8915fad9bc84f123148c50294786840a4821", "#F00", 1, 1, "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
    })

    test("5", async () => {
        await pullOne("", "", NaN, NaN, undefined)
    })
})

// @ponicode
describe("removeVersionDir", () => {
    test("0", async () => {
        await removeVersionDir(["rgb(0,100,200)", "#F00", "red", "green", "red", "#FF00FF", "rgb(0,100,200)", "red"], 30)
    })

    test("1", async () => {
        await removeVersionDir(["black", "red", "green", "rgb(0.1,0.2,0.3)", "green", "hsl(10%,20%,40%)", "hsl(10%,20%,40%)", "#FF00FF"], 2)
    })

    test("2", async () => {
        await removeVersionDir(["#F00", "rgb(0,100,200)", "#FF00FF", "black", "red", "rgb(20%,10%,30%)", "#F00", "rgb(20%,10%,30%)"], 1)
    })

    test("3", async () => {
        await removeVersionDir(["rgb(20%,10%,30%)", "red", "#FF00FF", "black", "rgb(0,100,200)", "green", "rgb(20%,10%,30%)", "#F00"], 4)
    })

    test("4", async () => {
        await removeVersionDir(["green", "rgb(0.1,0.2,0.3)", "#F00", "#FF00FF", "#FF00FF", "rgb(0.1,0.2,0.3)", "rgb(0.1,0.2,0.3)", "green"], 400)
    })

    test("5", async () => {
        await removeVersionDir(undefined, undefined)
    })
})

// @ponicode
describe("pull_plugins", () => {
    test("0", async () => {
        await pull_plugins(["--testrunner=", "--%s", "-created", "-updated", "-resolved", "--email", "--pw", "--domain", "--localtime", "--utc", "--count", "--topcount", "unknown option: ", "--user", "--embed", "--include-dir", "--cleanup", "--annotate-coverage", "--convert-range", "--line-directives", "--no-c-in-traceback", "--gdb", "--gdb-outdir", "--lenient", -2, -3, "--capi-reexport-cincludes", "--fast-fail", "--old-style-globals", "--directive", "Unknown debug flag: %s\n", "Unknown compiler flag: %s\n", "-u", "--image", "-i"])
    })

    test("1", async () => {
        await pull_plugins(true)
    })

    test("2", async () => {
        await pull_plugins(false)
    })

    test("3", async () => {
        await pull_plugins(undefined)
    })
})
