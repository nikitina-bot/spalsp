export const nodesStruct: Array<Pick<TreeNode, "key" | "label" | "descendants">> = [
  {
    key: "all",
    label: "Россия",
    descendants: [
      {
        key: "company",
        label: "Публицистический",
        descendants: [
          {
            key: "company.id",
            label: "NER",
            descendants: [
              {
                key: "ner.id",
                label: "Статьи иноагентов"
              },
              {
                key: "ner.city",
                label: "Посты в группах ультраправых"
              }
            ]
          },
          {
            key: "company.city",
            label: "Извлечение синонимов",
            descendants: [
              {
                key: "newe.id",
                label: "Статьи иноагентов"
              }
            ]
          }
        ]
      },
      {
        key: "device",
        label: "Официально-деловой",
        descendants: [
          {
            key: "device.id",
            label: "NER",
            descendants: [
              {
                key: "device1.id",
                label: "Техническая документация",
                descendants: [
                  {
                    key: "device11.id",
                    label: "Технические акты"
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  }
];

export const nodesPattern: Array<Pick<TreeNode, "key" | "label" | "descendants">> = [
  {
    key: "all",
    label: "Россия",
    descendants: [
      {
        key: "company",
        label: "Публицистический",
        descendants: [
          {
            key: "company.id",
            label: "NER",
            descendants: [
              {
                key: "ner.id",
                label: "Статьи иноагентов",
                descendants: [
                  {
                    key: "ner21111111.city",
                    label: "О заболеваниях",
                    descendants: [
                    {
                      key: "ner1.id",
                      label: "<NP=hypo>,[<NP=hypo>,][а также/также как [и]/и/или] другие/другим/других/о других <NP=hyper>"
                    }
                    ]
                  },
                ]
              },
              {
                key: "ner.city",
                label: "Посты в группах ультраправых"
              }
            ]
          },
          {
            key: "company.city",
            label: "Извлечение синонимов",
            descendants: [
              {
                key: "newe.id",
                label: "Статьи иноагентов"
              }
            ]
          }
        ]
      },
      {
        key: "device",
        label: "Официально-деловой",
        descendants: [
          {
            key: "device.id",
            label: "NER",
            descendants: [
              {
                key: "device1.id",
                label: "Техническая документация",
                descendants: [
                  {
                    key: "device11.id",
                    label: "Технические акты",
                    descendants: [
                      {
                        key: "device111.id",
                        label: "По вопросу"
                      },
                      {
                        key: "device112.id",
                        label: "Дата",
                        descendants: [
                          {
                            key: "device1121.id",
                            label: "Дата проведения работ и стадия эксплуатации изделия:"
                          }
                        ]
                      },
                      {
                        key: "device113.id",
                        label: "Описание работ",
                        descendants: [
                          {
                            key: "device1131.id",
                            label: "Промывка",
                            descendants: [
                              {
                                key: "device11311.id",
                                label: "<N> температур <N> [для <N>]"
                              }
                            ]
                          },
                          {
                            key: "device1132.id",
                            label: "Отбор проб",
                            descendants: [
                              {
                                key: "device11321.id",
                                label: "<N> отбор проб [из]"
                              }
                            ]
                          },
                          {
                            key: "device1133.id",
                            label: "Проверка момента затяжки"
                          }
                        ]
                      },
                    ]
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  }
];

export const nodesOnto: Array<Pick<TreeNode, "key" | "label" | "descendants">> = [
  {
    key: "all",
    label: "Россия",
    descendants: [
      {
        key: "company",
        label: "Публицистический",
        descendants: [
          {
            key: "company.id",
            label: "NER",
            descendants: [
              {
                key: "ner.id",
                label: "Статьи иноагентов",
                descendants: [
                  {
                    key: "ner21111111.city",
                    label: "О заболеваниях",
                    descendants: [
                    {
                      key: "ner1.id",
                      label: "Распространение ВИЧ.ont"
                    }
                    ]
                  },
                ]
              },
              {
                key: "ner.city",
                label: "Посты в группах ультраправых"
              }
            ]
          },
          {
            key: "company.city",
            label: "Извлечение синонимов",
            descendants: [
              {
                key: "newe.id",
                label: "Статьи иноагентов"
              }
            ]
          }
        ]
      },
      {
        key: "device",
        label: "Официально-деловой",
        descendants: [
          {
            key: "device.id",
            label: "NER",
            descendants: [
              {
                key: "device1.id",
                label: "Техническая документация",
                descendants: [
                  {
                    key: "device11.id",
                    label: "Технические акты",
                    descendants: [
                      {
                        key: "device111.id",
                        label: "По вопросу"
                      },
                      {
                        key: "device112.id",
                        label: "Дата",
                        descendants: [
                          {
                            key: "device1121.id",
                            label: "Дата проведения работ и стадия эксплуатации изделия:"
                          }
                        ]
                      },
                      {
                        key: "device113.id",
                        label: "Описание работ",
                        descendants: [
                          {
                            key: "device1131.id",
                            label: "Промывка",
                            descendants: [
                              {
                                key: "device11311.id",
                                label: "Promyvka.ont"
                              }
                            ]
                          },
                          {
                            key: "device1132.id",
                            label: "Отбор проб",
                            descendants: [
                              {
                                key: "device11321.id",
                                label: "Proby.ont"
                              }
                            ]
                          },
                          {
                            key: "device1133.id",
                            label: "Проверка момента затяжки"
                          }
                        ]
                      },
                    ]
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  }
];

export const nodesDocs: Array<Pick<TreeNode, "key" | "label" | "descendants">> = [
  {
    key: "all",
    label: "Россия",
    descendants: [
      {
        key: "company",
        label: "Публицистический",
        descendants: [
          {
            key: "company.id",
            label: "NER",
            descendants: [
              {
                key: "ner.id",
                label: "Статьи иноагентов",
                descendants: [
                  {
                    key: "ner21111111.city",
                    label: "О заболеваниях",
                    descendants: [
                    {
                      key: "ner1.id",
                      label: "Распространение ВИЧ.docx"
                    },
                    {
                      key: "ner2.city",
                      label: "Статистика СПИД.docx"
                    }
                    ]
                  },
                ]
              },
              {
                key: "ner.city",
                label: "Посты в группах ультраправых"
              }
            ]
          },
          {
            key: "company.city",
            label: "Извлечение синонимов",
            descendants: [
              {
                key: "newe.id",
                label: "Статьи иноагентов"
              }
            ]
          }
        ]
      },
      {
        key: "device",
        label: "Официально-деловой",
        descendants: [
          {
            key: "device.id",
            label: "NER",
            descendants: [
              {
                key: "device1.id",
                label: "Техническая документация",
                descendants: [
                  {
                    key: "device11.id",
                    label: "Технические акты",
                    descendants: [
                      {
                        key: "device111.id",
                        label: "По вопросу"
                      },
                      {
                        key: "device112.id",
                        label: "Дата",
                        descendants: [
                          {
                            key: "device1121.id",
                            label: "Дата проведения работ и стадия эксплуатации изделия:"
                          }
                        ]
                      },
                      {
                        key: "device113.id",
                        label: "Описание работ",
                        descendants: [
                          {
                            key: "device1131.id",
                            label: "Промывка",
                            descendants: [
                              {
                                key: "device11311.id",
                                label: "Акт от 23.03.2021.docx"
                              },
                              {
                                key: "device11312.id",
                                label: "Акт от 30.03.2021.docx"
                              },
                              {
                                key: "device11313.id",
                                label: "Акт от 30.04.2021.docx"
                              },

                            ]
                          },
                          {
                            key: "device1132.id",
                            label: "Отбор проб",
                            descendants: [
                              {
                                key: "device11321.id",
                                label: "Акт 21.02.2022.docx"
                              }
                            ]
                          },
                          {
                            key: "device1133.id",
                            label: "Проверка момента затяжки"
                          }
                        ]
                      },
                    ]
                  }
                ]
              }
            ]
          },
        ]
      },
    ]
  }
];

export const getRemoteData = async (nodesS: string): Promise<{ data: string }> => {
  const nodes = nodesS==="onto" ? nodesOnto : nodesS==="docs" ? nodesDocs : nodesPattern;
  const getKeysString = (nodes) => {
    let keys = [];

    const traverseNodes = (nodes) => {
      nodes.forEach((node) => {
        if (!node.descendants)
          keys.push(node.key);
        if (node.descendants) {
          traverseNodes(node.descendants);
        }
      });
    };

    traverseNodes(nodes);

    return keys.join(",");
  };

  console.log("_____________________________"+getKeysString(nodes));
  return Promise.resolve({
    data: getKeysString(nodes)
  });
}
