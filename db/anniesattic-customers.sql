--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-11 18:07:40

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
-- TOC entry 204 (class 1259 OID 6395713)
-- Name: customers; Type: TABLE; Schema: anniesattic; Owner: -
--

CREATE TABLE anniesattic.customers (
    idcustomers integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL
);


--
-- TOC entry 203 (class 1259 OID 6395711)
-- Name: customers_idcustomers_seq; Type: SEQUENCE; Schema: anniesattic; Owner: -
--

CREATE SEQUENCE anniesattic.customers_idcustomers_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4000 (class 0 OID 0)
-- Dependencies: 203
-- Name: customers_idcustomers_seq; Type: SEQUENCE OWNED BY; Schema: anniesattic; Owner: -
--

ALTER SEQUENCE anniesattic.customers_idcustomers_seq OWNED BY anniesattic.customers.idcustomers;


--
-- TOC entry 3859 (class 2604 OID 6395716)
-- Name: customers idcustomers; Type: DEFAULT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.customers ALTER COLUMN idcustomers SET DEFAULT nextval('anniesattic.customers_idcustomers_seq'::regclass);


--
-- TOC entry 3993 (class 0 OID 6395713)
-- Dependencies: 204
-- Data for Name: customers; Type: TABLE DATA; Schema: anniesattic; Owner: -
--

COPY anniesattic.customers (idcustomers, first_name, last_name, username, email, password) FROM stdin;
2	no	why	Blue	nicholasklein12@gmail.com	$2y$10$ciQXLBGMbHiIVRp8NOWkg.UJb6/22YKVOzY5e5afAFZM6HjVJEPMq
35	dick	porterson	boobies	dickporterson@yahooboobs.com	$2y$10$Hby3yE8lMzQMTxKsqOu5ve0KoYPFJjCjiqS/S4Ujw/UBuk/0vT7ra
36	test	test	test	test@gmail.com	$2y$10$9mDVoujzJFOewAnvAC4jYuLHkceDm3hOwg87P6bpM8l18LL06SI5C
37	jack123@gmail.com	jack123@gmail.com	jack123@gmail.com	jack123@gmail.com	$2y$10$gRH6zjhu5N31CoA08vn8NeO151Saep9UboKA6nApH.BdPtmSVDD.S
1	John	Smith	admin	john_smith@gmail.com	$2y$10$D.ufAFYqidMFi.MaLcOwuO2hOB/gM0WJjJqc.bW.DsAslH7v4zrrm
38	Audrey	Kula	admin2	jared1979@gmail.com	$2y$10$0BAkulTZoNx2qpKdPvWngObNFnar4PCSI16rgAG4duJD0wARUSNHi
69	Cannon	Dickson	Parricet16@gmail.com	Parricet16@gmail.com	$2y$10$HxyiJaPx9zB4XB6DNLg1GOnCIADvm6erpwa0lc5P2E/qr99ID1TGC
40	Annie	Seymour	ajdesign50	ajdesign50@gmail.com	$2y$10$1QMMqmvcNVoRE4AVrBCpwO4cjwQDySjGxL4BK6CSxJ1vrkDGK7v6C
41	Derek	Drennan	derek	derek@gmail.com	$2y$10$uTcc7ZsFhCfQk3XOmdUSIO3T6jAt9BhoY20amgSIlx/ScawgogOmK
42	Derek	Dr	derek1	derek1@gmail.com	$2y$10$fK/G74mDi9MXWaLbrb40tub.mp1drls8kMB3wxKtI/EQV.l1bjU4.
43	testuser123	testuser123	testuser123	testuser123@gmail.com	$2y$10$9pyDmMLMqHiSrVwEW/PXMuxSmtOReNmPqOmVG.Ll9uy1joxFkALAW
\.


--
-- TOC entry 4001 (class 0 OID 0)
-- Dependencies: 203
-- Name: customers_idcustomers_seq; Type: SEQUENCE SET; Schema: anniesattic; Owner: -
--

SELECT pg_catalog.setval('anniesattic.customers_idcustomers_seq', 43, true);


--
-- TOC entry 3861 (class 2606 OID 6395718)
-- Name: customers pk_idcustomers; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.customers
    ADD CONSTRAINT pk_idcustomers PRIMARY KEY (idcustomers);


--
-- TOC entry 3863 (class 2606 OID 6395722)
-- Name: customers uc_email; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.customers
    ADD CONSTRAINT uc_email UNIQUE (email);


--
-- TOC entry 3865 (class 2606 OID 6395720)
-- Name: customers uc_username; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.customers
    ADD CONSTRAINT uc_username UNIQUE (username);


--
-- TOC entry 3999 (class 0 OID 0)
-- Dependencies: 674
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON LANGUAGE plpgsql TO osmlfjpdadfgto;


-- Completed on 2021-03-11 18:07:47

--
-- PostgreSQL database dump complete
--

