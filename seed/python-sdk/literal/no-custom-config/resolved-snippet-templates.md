```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.headers.send(
	query="What is the weather today"
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.headers.send(
	query="What is the weather today"
)
 
```                        


```python
from seed.inlined import ATopLevelLiteral

client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.inlined.send(
	query="What is the weather today",
	temperature=10.1,
	object_with_literal=ATopLevelLiteral(
		nested_literal=ANestedLiteral(
			
		)
	)
)
 
```                        


```python
from seed.inlined import ATopLevelLiteral

client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.inlined.send(
	query="What is the weather today",
	temperature=10.1,
	object_with_literal=ATopLevelLiteral(
		nested_literal=ANestedLiteral(
			
		)
	)
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.path.send(
	
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.path.send(
	
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.query.send(
	query="What is the weather today"
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.query.send(
	query="string"
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.reference.send(
	query="What is the weather today"
)
 
```                        


```python


client = SeedLiteral(base_url="https://yourhost.com/path/to/api", )        
client.reference.send(
	query="What is the weather today"
)
 
```                        


