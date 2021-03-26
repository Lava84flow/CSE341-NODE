--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-03-25 15:02:34

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
-- TOC entry 214 (class 1259 OID 6396096)
-- Name: media_type; Type: TABLE; Schema: anniesattic; Owner: -
--

CREATE TABLE anniesattic.media_type (
    idmedia_type integer NOT NULL,
    media_name character varying(50) NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 6396094)
-- Name: media_type_idmedia_type_seq; Type: SEQUENCE; Schema: anniesattic; Owner: -
--

CREATE SEQUENCE anniesattic.media_type_idmedia_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 213
-- Name: media_type_idmedia_type_seq; Type: SEQUENCE OWNED BY; Schema: anniesattic; Owner: -
--

ALTER SEQUENCE anniesattic.media_type_idmedia_type_seq OWNED BY anniesattic.media_type.idmedia_type;


--
-- TOC entry 3859 (class 2604 OID 6396099)
-- Name: media_type idmedia_type; Type: DEFAULT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.media_type ALTER COLUMN idmedia_type SET DEFAULT nextval('anniesattic.media_type_idmedia_type_seq'::regclass);


--
-- TOC entry 3989 (class 0 OID 6396096)
-- Dependencies: 214
-- Data for Name: media_type; Type: TABLE DATA; Schema: anniesattic; Owner: -
--

COPY anniesattic.media_type (idmedia_type, media_name) FROM stdin;
1	Print on Canvas
\.


--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 213
-- Name: media_type_idmedia_type_seq; Type: SEQUENCE SET; Schema: anniesattic; Owner: -
--

SELECT pg_catalog.setval('anniesattic.media_type_idmedia_type_seq', 1, true);


--
-- TOC entry 3861 (class 2606 OID 6396101)
-- Name: media_type media_type_pkey; Type: CONSTRAINT; Schema: anniesattic; Owner: -
--

ALTER TABLE ONLY anniesattic.media_type
    ADD CONSTRAINT media_type_pkey PRIMARY KEY (idmedia_type);


--
-- TOC entry 3995 (class 0 OID 0)
-- Dependencies: 674
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON LANGUAGE plpgsql TO osmlfjpdadfgto;


-- Completed on 2021-03-25 15:02:42

--
-- PostgreSQL database dump complete
--

