export const warpGuideTheme = {
  name: "warp-guide",
  type: "dark" as const,
  fg: "#e4e4e7",
  bg: "transparent",
  settings: [
    {
      settings: {
        foreground: "#e4e4e7",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#71717a",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "storage",
        "storage.type",
        "storage.modifier",
      ],
      settings: {
        foreground: "#7c3aed",
      },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: {
        foreground: "#22c55e",
      },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: {
        foreground: "#00e5ff",
      },
    },
    {
      scope: ["constant.numeric", "constant.language"],
      settings: {
        foreground: "#f59e0b",
      },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
      ],
      settings: {
        foreground: "#00e5ff",
      },
    },
    {
      scope: ["variable", "variable.parameter", "variable.other"],
      settings: {
        foreground: "#e4e4e7",
      },
    },
    {
      scope: [
        "keyword.operator",
        "punctuation",
        "punctuation.separator",
        "punctuation.terminator",
      ],
      settings: {
        foreground: "#71717a",
      },
    },
    {
      scope: ["constant.other.placeholder", "variable.other.enummember"],
      settings: {
        foreground: "#f59e0b",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name"],
      settings: {
        foreground: "#ef4444",
      },
    },
    {
      scope: ["variable.other.property", "meta.object-literal.key"],
      settings: {
        foreground: "#00e5ff",
      },
    },
    {
      scope: ["source.shell", "support.function.builtin"],
      settings: {
        foreground: "#00e5ff",
      },
    },
  ],
};
