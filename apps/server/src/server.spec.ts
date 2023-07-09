import supertest from "supertest";
import http from "http";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Server } from "./server";

describe("Server", () => {
	let request: supertest.SuperTest<supertest.Test>;
	beforeAll(async () => {
		const server = new Server();
		const app = await server.bootstrap();
		request = supertest(app);
	});

	it("should call mounted hello route", async () => {
		const res = await request.get("/hello");
		expect(res.status).toBe(200);
		expect(res.text).toBe("Hello world !");
	});

	it("should run and shutdown server", async () => {
		const server = new Server();
		const spy = vi.spyOn(http, "createServer");
		await server.bootstrap();
		server.run();
		expect(spy).toHaveBeenCalled();
		server.shutdown();
	});
});
