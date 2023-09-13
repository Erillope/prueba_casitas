from cosa_de_casa import *
from util import load_json

ObjCasa.cargar_objetos(r'public/archivos/cosas.txt')
Escenario.cargar_escenarios(r'public/archivos/escenarios.txt')
Casa.cargar_casas(r'public/archivos/casas.txt')

objetos = ObjCasa.get_objetos()
osito, dinero10, dinero20, dinero50, dinero100 = objetos[0:5]
celular, escoba, soda, pantalla, poster = objetos[5:10]

escenarios = Escenario.get_escenarios()
room_1, living_1, cocina_1, baño_1, room_2, living_2, cocina_2, baño_2 = escenarios[0:8]
room_3, living_3, cocina_3, baño_3 = escenarios[8:12]


room_1.set_objetos(osito, dinero10, dinero20)
living_1.set_objetos(celular, soda, pantalla)
cocina_1.set_objetos(dinero100, soda, poster)
baño_1.set_objetos(escoba, dinero10, osito)

room_2.set_objetos(poster, pantalla, soda)
living_2.set_objetos(pantalla, osito, escoba)
cocina_2.set_objetos(celular, dinero20, soda)
baño_2.set_objetos(pantalla, poster, soda)

room_3.set_objetos(celular, pantalla, poster)
living_3.set_objetos(dinero50, soda, osito)
cocina_3.set_objetos(escoba, poster, celular)
baño_3.set_objetos(soda, osito, escoba)

Casa.get_casas()[0].set_escenarios(room_1, living_1, cocina_1, baño_1)
Casa.get_casas()[1].set_escenarios(room_2, living_2, cocina_2, baño_2)
Casa.get_casas()[2].set_escenarios(room_3, living_3, cocina_3, baño_3)



load_json(r'public/info.json',Casa.get_casas())
