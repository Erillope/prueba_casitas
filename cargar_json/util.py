import json
class Mostrable:
    def __init__(self, descripcion : str, ruta_imagen : str, nombre : str) -> None:
        self.descripcion = descripcion
        self.ruta_imagen = ruta_imagen
        self.nombre = nombre
    
    def get_nombre(self) -> str:
        return self.nombre
    
    def to_json(self) -> dict: 
        return self.__dict__
    
    def copy(self):...
     

def load_json(ruta: str, obj: Mostrable) -> None:
    obj = list(map(lambda x: x.to_json(), obj))
    with open(ruta,'w', encoding='utf-8') as f:
        f.write(json.dumps(obj,indent=1))
