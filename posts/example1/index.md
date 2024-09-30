---
title: Markdown example
description: markdown example post.
author: nikachu2012
timestamp: 2024-09-26T03:10:23.653Z
uuid: 0525144d-9300-440c-9bde-5bf8d5b19745
---

# h1 sample
## h2 sample
### h3 sample
#### h4 sample
##### h5 sample
###### h6 sample

### text
This is paragraph[^1].  
*italic* **bold**  
~~deleted~~
[^1]: this is footnote

[External Link](https://google.com)

### list 
- 1
    - 2
- 3

1. a
    1. b
2. c

### blockquote
> 楽しちゃだめだから

### code
This is `inline` code.  

```c {1,3-4}
#include <stdlib.h>
int main()
{
    // this is code block
    char str[] = "hotaru kawaii";

    write(STDOUT_FILENO, str, strlen(str))
}
```

![This is image](image.JPEG)
*caption*

### Table

| a       | b    |   c    |     d |
| ------- | :--- | :----: | ----: |
| default | left | center | right |

### Tasklist

- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

### Alert

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.
