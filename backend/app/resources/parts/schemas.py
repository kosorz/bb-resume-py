from typing import List, Optional
from pydantic import BaseModel


class OrderUpdate(BaseModel):
    order: Optional[List[int]]