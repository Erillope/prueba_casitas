from subprocess import run
run(["python", "cargar_json/main.py"])
run("start chrome http://localhost:3000/index.html", shell=True)
run("node server.js", shell=True)


