# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('README.md') as f:
    readme = f.read()

with open('LICENSE') as f:
    license = f.read()

with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(
    name='funds_viewer',
    version='0.1.0',
    description='Trabalho Prático para disciplina de INF723, UFV',
    long_description=readme,
    author='Gustavo Viegas, Henrique Penna',
    url='https://github.com/gfviegas/INF723-TP',
    license=license,
    packages=find_packages(exclude=('tests', 'docs')),
    install_requires=required
)
