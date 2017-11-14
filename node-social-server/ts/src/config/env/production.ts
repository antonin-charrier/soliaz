
export default {
	env: "production",
	neo4j: process.env.NEO4J_URL,
	port: process.env.PORT,
	jwtSecret: process.env.SECRET
};