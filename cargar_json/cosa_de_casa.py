from util import Mostrable
from random import randint

class ObjCasa(Mostrable):
    objetos = []
    def __init__(self, descripcion : str, ruta_imagen : str, nombre : str, 
                precio : int, pos : list, escenario = None, identificador = None) -> None:
        super().__init__(descripcion, ruta_imagen, nombre)
        self.id = identificador
        self.precio = precio
        self.pos = pos
        self.escenario = escenario

    def set_pos(self, x, y) -> None:
        self.pos = [x,y]
    
    def copy(self):
        return ObjCasa(self.descripcion, self.ruta_imagen, self.nombre, self.precio, self.pos, self.escenario, self.id)

    def cargar_objetos(ruta) -> None:
        with open(ruta,'r', encoding='utf-8') as f:
            for line in f:
                info = line.strip('\n').split(',')
                ObjCasa.objetos.append(ObjCasa(info[2], info[1], info[0], float(info[3]), [int(info[4]), int(info[5])]))

    def get_objetos() -> list:
        return ObjCasa.objetos

class Escenario(Mostrable):
    escenarios = []
    ID = 0
    def __init__(self, descripcion : str, ruta_imagen : str, nombre : str, objetos : list, identificador = None) -> None:
        super().__init__(descripcion, ruta_imagen, nombre)
        self.objetos = objetos
        self.id = identificador
    
    def set_objetos(self, *objetos) -> None:
        for objeto in objetos:
            obj = objeto.copy()
            obj.id = str(Escenario.ID)
            obj.escenario = self.nombre
            obj.set_pos(randint(0,1000), randint(0,500))
            self.objetos.append(obj)
            Escenario.ID += 1
    
    def to_json(self) -> dict:
        self.__dict__['objetos'] = list(map(lambda x: x.to_json(), self.objetos))
        return self.__dict__
    
    def copy(self):
        return Escenario(self.descripcion, self.ruta_imagen, self.nombre, self.objetos, self.id)

    def cargar_escenarios(ruta) -> None:
        with open(ruta,'r',encoding='utf-8') as f:
            for line in f:
                info = line.strip('\n').split(',')
                Escenario.escenarios.append(Escenario(info[2], info[1], info[0], []))

    def get_escenarios() -> list:
        return Escenario.escenarios

class Casa(Mostrable):
    casas = []
    def __init__(self, descripcion : str, ruta_imagen : str, nombre : str, escenarios : list) -> None:
        super().__init__(descripcion, ruta_imagen, nombre)
        self.escenarios = escenarios

    def set_escenarios(self, *escenarios) -> None:
        for escenario in escenarios:
            escenario = escenario.copy()
            self.escenarios.append(escenario)

    def to_json(self) -> dict:
        self.__dict__['escenarios'] = list(map(lambda x: x.to_json(), self.escenarios))
        return self.__dict__

    def cargar_casas(ruta) -> list:
        with open(ruta,'r',encoding='utf-8') as f:
            for line in f:
                info = line.strip('\n').split(',')
                Casa.casas.append(Casa(info[2], info[1], info[0], []))
    
    def get_casas() -> list:
        return Casa.casas