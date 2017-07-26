livefyre('''
test:
  image:
    label: corpjenkins/node
  git: true
  commands:
    - make
    - make test
  coberturaResults: []
deploy:
  git: true
  commands:
    - rm -rf node_modules
    - make
  deb: {}
''')
