#version 430 core

uniform sampler2D textureSampler;
uniform vec3 lightPos;

uniform vec3 objectColor;
uniform vec3 cameraPos;


in vec3 interpNormal;
in vec2 interpTexCoord;
in vec3 fragPos;

void main()
{
	
	vec4 color = texture2D(textureSampler, -interpTexCoord);
	vec3 normal = normalize(interpNormal);

	vec3 lightDir = normalize(lightPos - fragPos);

	vec3 V = normalize(cameraPos - fragPos);
	vec3 R = reflect(-normalize(lightDir), normal);

	float specular = pow(max(0, dot(R,V)), 10);
	float diffuse = max(0, dot(normal, normalize(lightDir)));

	vec3 texture = vec3(color.x, color.y, color.z);

	float ambient = 0.2;
	gl_FragColor = vec4(mix(texture, texture * diffuse + vec3(1) * specular, 0.9f), 1.0f) + ambient;

}
