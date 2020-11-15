from typing import List, Optional
from pydantic import BaseModel, constr


class OrderUpdate(BaseModel):
    order: Optional[List[int]]


EmptyString = constr(regex="^$")
