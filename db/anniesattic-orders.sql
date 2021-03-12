--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-12 14:23:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 6396026)
-- Name: orders; Type: TABLE; Schema: anniesattic; Owner: -
--

CREATE TABLE anniesattic.orders (
    idorders integer NOT NULL,
    customers_idcustomers integer NOT NULL,
    subtotal money NOT NULL,
    taxes money NOT NULL,
    shipping money NOT NULL,
    status character varying(50) NOT NULL,
    shipping_address character varying(150) NOT NULL,
    billing_address character varying(150)
);


--
-- TOC entry 209 (class 1259 OID 6396024)
-- Name: orders_idorders_seq; Type: SEQUENCE; Schema: anniesattic; Owner: -
--

CREATE SEQUENCE anniesattic.orders_idorders_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 209
-- Name: orders_idorders_seq; Type: SEQUENCE OWNED BY; Schema: anniesattic; Owner: -
--

ALTER SEQUENCE anniesattic.orders_idorders_seq OWNED BY anniesattic.orders.idorders;


--
-- TOC entry 3859 (class 2604 OID 6396029)
-- Name: orders idorders; Type: DEFAULT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.orders ALTER COLUMN idorders SET DEFAULT nextval('anniesattic.orders_idorders_seq'::regclass);


--
-- TOC entry 3990 (class 0 OID 6396026)
-- Dependencies: 210
-- Data for Name: orders; Type: TABLE DATA; Schema: anniesattic; Owner: -
--

COPY anniesattic.orders (idorders, customers_idcustomers, subtotal, taxes, shipping, status, shipping_address, billing_address) FROM stdin;
1	38	$50.00	$4.00	$2.50	In Progress	3375 School Street, New Haven, CT, 06511	2478 Tenmile, Escondido, CA, 92025
2	1	$45.00	$2.25	$10.00	In Progress	2882 W Elliot Drive #G305, Spokane, WA 99224	 , ,  
3	1	$35.00	$1.75	$10.00	In Progress	2848 Wilkinson Street , Nashville, TN 37211	2882 W Elliot Drive #G305, Spokane, WA 99224
4	43	$40.00	$2.00	$10.00	In Progress	black 22232 jio, Mesa, CA 	black 22232 jio, Mesa, CA 
\.


--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 209
-- Name: orders_idorders_seq; Type: SEQUENCE SET; Schema: anniesattic; Owner: -
--

SELECT pg_catalog.setval('anniesattic.orders_idorders_seq', 4, true);


--
-- TOC entry 3861 (class 2606 OID 6396031)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (idorders);


--
-- TOC entry 3862 (class 2606 OID 6396032)
-- Name: orders orders_customers_idcustomers_fkey; Type: FK CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.orders
    ADD CONSTRAINT orders_customers_idcustomers_fkey FOREIGN KEY (customers_idcustomers) REFERENCES anniesattic.customers(idcustomers);


--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 674
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON LANGUAGE plpgsql TO osmlfjpdadfgto;


-- Completed on 2021-03-12 14:23:53

--
-- PostgreSQL database dump complete
--

