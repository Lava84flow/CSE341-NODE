--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-11 17:49:20

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 208 (class 1259 OID 6395968)
-- Name: addresses; Type: TABLE; Schema: anniesattic; Owner: -
--

CREATE TABLE anniesattic.addresses (
    idaddresses integer NOT NULL,
    customers_idcustomers integer NOT NULL,
    address_type anniesattic.address_type NOT NULL,
    address_line1 character varying(100) NOT NULL,
    address_line2 character varying(100),
    city character varying(45) NOT NULL,
    state character(2) NOT NULL,
    zipcode character varying(9) NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 6395966)
-- Name: addresses_idaddresses_seq; Type: SEQUENCE; Schema: anniesattic; Owner: -
--

CREATE SEQUENCE anniesattic.addresses_idaddresses_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 207
-- Name: addresses_idaddresses_seq; Type: SEQUENCE OWNED BY; Schema: anniesattic; Owner: -
--

ALTER SEQUENCE anniesattic.addresses_idaddresses_seq OWNED BY anniesattic.addresses.idaddresses;


--
-- TOC entry 3859 (class 2604 OID 6395971)
-- Name: addresses idaddresses; Type: DEFAULT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.addresses ALTER COLUMN idaddresses SET DEFAULT nextval('anniesattic.addresses_idaddresses_seq'::regclass);


--
-- TOC entry 3990 (class 0 OID 6395968)
-- Dependencies: 208
-- Data for Name: addresses; Type: TABLE DATA; Schema: anniesattic; Owner: -
--

COPY anniesattic.addresses (idaddresses, customers_idcustomers, address_type, address_line1, address_line2, city, state, zipcode) FROM stdin;
5	1	shipping	3753 Crowfield Road	\N	Phoenix	AZ	85032
6	1	billing	2848 Wilkinson Street	\N	Nashville	TN	37211
9	1	shipping	2882 W Elliot Drive	#G305	Spokane	WA	99224
10	40	shipping	22749 Marine View Dr S	#11	Des Moines	WA	98198
12	41	shipping	11111 Cherry St	\N	Spokane	WA	99207
14	43	shipping	black 22232	jio	Mesa	CA	
\.


--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 207
-- Name: addresses_idaddresses_seq; Type: SEQUENCE SET; Schema: anniesattic; Owner: -
--

SELECT pg_catalog.setval('anniesattic.addresses_idaddresses_seq', 14, true);


--
-- TOC entry 3861 (class 2606 OID 6395973)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (idaddresses);


--
-- TOC entry 3862 (class 2606 OID 6395989)
-- Name: addresses addresses_customers_idcustomers_fkey; Type: FK CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.addresses
    ADD CONSTRAINT addresses_customers_idcustomers_fkey FOREIGN KEY (customers_idcustomers) REFERENCES anniesattic.customers(idcustomers) NOT VALID;


--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 674
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON LANGUAGE plpgsql TO exxxeodaiqlgnt;


-- Completed on 2021-03-11 17:49:27

--
-- PostgreSQL database dump complete
--

