update camera 
set frame = 'half' 
where CAST(JSON_UNQUOTE(JSON_EXTRACT(imageSensorSize, '$[0]')) AS DECIMAL(10, 1)) < 30;

update camera 
set frame = 'full' 
where CAST(JSON_UNQUOTE(JSON_EXTRACT(imageSensorSize, '$[0]')) AS DECIMAL(10, 1)) between 30 and 40;

update camera 
set frame = 'medium' 
where CAST(JSON_UNQUOTE(JSON_EXTRACT(imageSensorSize, '$[0]')) AS DECIMAL(10, 1)) between 40 and 50;

update camera 
set frame = 'large' 
where CAST(JSON_UNQUOTE(JSON_EXTRACT(imageSensorSize, '$[0]')) AS DECIMAL(10, 1)) > 50;

update camera set keyword = model where keyword is null;